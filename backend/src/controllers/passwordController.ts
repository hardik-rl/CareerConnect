import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";

import prisma from "../lib/prisma.js";
import { sendPasswordResetEmail } from "../utils/passwordResetEmail.js";

const RESET_TOKEN_EXPIRY = 15 * 60 * 1000;

export const forgotPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    /*
     * Security:
     * Don't reveal whether the email exists.
     */
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    /*
     * Delete previous unused tokens.
     */
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
        usedAt: null,
      },
    });

    /*
     * Generate secure random token.
     */
    const rawToken = crypto.randomBytes(32).toString("hex");

    /*
     * Store only token hash in database.
     */
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const expiresAt = new Date(
      Date.now() + RESET_TOKEN_EXPIRY
    );

    await prisma.passwordResetToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt,
      },
    });

    const frontendUrl =
      process.env.FRONTEND_URL || "http://localhost:5173";

    const resetUrl =
      `${frontendUrl}/reset-password?token=${rawToken}`;

    await sendPasswordResetEmail({
      email: user.email,
      name: user.name,
      resetUrl,
    });

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


export const resetPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    /*
     * Hash token received from frontend.
     */
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const resetToken =
      await prisma.passwordResetToken.findUnique({
        where: {
          tokenHash,
        },
        include: {
          user: true,
        },
      });

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    if (resetToken.usedAt) {
      return res.status(400).json({
        success: false,
        message: "This reset link has already been used",
      });
    }

    if (resetToken.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "This reset link has expired",
      });
    }

    /*
     * Hash new password.
     */
    const hashedPassword = await bcrypt.hash(password, 12);

    /*
     * Update password + mark token as used.
     */
    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: resetToken.userId,
        },
        data: {
          password: hashedPassword,
        },
      }),

      prisma.passwordResetToken.update({
        where: {
          id: resetToken.id,
        },
        data: {
          usedAt: new Date(),
        },
      }),

      prisma.passwordResetToken.deleteMany({
        where: {
          userId: resetToken.userId,
          id: {
            not: resetToken.id,
          },
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};