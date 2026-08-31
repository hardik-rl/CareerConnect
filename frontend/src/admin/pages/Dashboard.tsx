import { useEffect } from "react";
import { useHeader } from "../context/HeaderContext";

const stats = [
  {
    title: "Total Users",
    value: "12,840",
  },
  {
    title: "Active Jobs",
    value: "1,248",
  },
  {
    title: "Applications",
    value: "4,562",
  },
  {
    title: "Reports",
    value: "94",
  },
];

const activities = [
  "New employer registered",
  "Job pending review",
  "User reported a listing",
  "Application milestone",
];

const bars = [56, 98, 140, 182, 56, 98, 140];

const AdminDashboard = () => {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("Overview", "Monitor your platform activity and performance");
  }, [setHeader]);

  return (
    <div
      className="
        min-h-[calc(100vh-78px)]
        bg-[#F7F8FC]
        px-[32px]
        pb-[50px]
        pt-[34px]
        max-md:px-[20px]
        max-sm:px-[16px]
        max-sm:pt-[24px]
      "
    >
      {/* =========================================
          WELCOME
      ========================================= */}
      <section>
        <h2
          className="
            text-[28px]
            font-semibold
            leading-[34px]
            tracking-[-0.5px]
            text-[#182336]
            max-sm:text-[24px]
            max-sm:leading-[30px]
          "
        >
          Welcome back, Hardik
        </h2>

        <p
          className="
            mt-[5px]
            text-[14px]
            leading-[20px]
            text-[#71809A]
          "
        >
          Here is what is happening across CareerConnect.
        </p>
      </section>

      {/* =========================================
          STAT CARDS
      ========================================= */}
      <section
        className="
          mt-[39px]
          grid
          grid-cols-4
          gap-[30px]
          xl:gap-[30px]
          lg:grid-cols-4
          md:grid-cols-2
          max-md:mt-[30px]
          max-md:gap-[20px]
          max-sm:grid-cols-1
        "
      >
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="
              h-[132px]
              rounded-[14px]
              bg-white
              px-[20px]
              py-[22px]
              max-sm:h-auto
              max-sm:min-h-[125px]
            "
          >
            <p
              className="
                text-[13px]
                leading-[16px]
                text-[#71809A]
              "
            >
              {stat.title}
            </p>

            <p
              className="
                mt-[18px]
                text-[30px]
                font-semibold
                leading-[30px]
                tracking-[-0.5px]
                text-[#182336]
              "
            >
              {stat.value}
            </p>

            <p
              className="
                mt-[8px]
                text-[12px]
                font-medium
                leading-[15px]
                text-[#00B86B]
              "
            >
              ↑ 12.5% this month
            </p>
          </div>
        ))}
      </section>

      {/* =========================================
          ACTIVITY + RECENT ACTIVITY
      ========================================= */}
      <section
        className="
          mt-[38px]
          grid
          grid-cols-[minmax(0,1fr)_350px]
          gap-[28px]
          xl:grid-cols-[minmax(0,2.18fr)_350px]
          lg:grid-cols-[minmax(0,1fr)_330px]
          md:grid-cols-1
          max-md:mt-[24px]
        "
      >
        {/* =====================================
            APPLICATION ACTIVITY
        ===================================== */}
        <div
          className="
            h-[300px]
            rounded-[14px]
            bg-white
            px-[24px]
            py-[28px]
            max-md:h-[280px]
            max-sm:h-[260px]
            max-sm:px-[20px]
            max-sm:py-[22px]
          "
        >
          <h3
            className="
              text-[18px]
              font-semibold
              leading-[22px]
              text-[#182336]
            "
          >
            Application activity
          </h3>

          {/* Chart */}
          <div
            className="
              flex
              h-[205px]
              items-end
              justify-center
              gap-[44px]
              pt-[30px]
              max-lg:gap-[30px]
              max-md:gap-[38px]
              max-sm:gap-[20px]
              max-sm:pt-[25px]
            "
          >
            {bars.map((height, index) => (
              <div
                key={index}
                className="
                  w-[38px]
                  shrink-0
                  rounded-[9px]
                  bg-[#5C5BE2]
                  max-md:w-[34px]
                  max-sm:w-[28px]
                "
                style={{
                  height: `${height}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* =====================================
            RECENT ACTIVITY
        ===================================== */}
        <div
          className="
            h-[300px]
            rounded-[14px]
            bg-white
            px-[24px]
            py-[28px]
            max-md:h-auto
            max-sm:px-[20px]
            max-sm:py-[22px]
          "
        >
          <h3
            className="
              text-[18px]
              font-semibold
              leading-[22px]
              text-[#182336]
            "
          >
            Recent activity
          </h3>

          <div className="mt-[25px] space-y-[14px]">
            {activities.map((activity) => (
              <div key={activity}>
                <p
                  className="
                    text-[14px]
                    font-semibold
                    leading-[17px]
                    text-[#253044]
                  "
                >
                  {activity}
                </p>

                <p
                  className="
                    mt-[5px]
                    text-[12px]
                    leading-[15px]
                    text-[#71809A]
                  "
                >
                  A few minutes ago
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;