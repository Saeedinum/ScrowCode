const FindTeamSkeleton = () => {
  return (
    <section className="mt-10 w-full px-4 sm:px-6 md:px-8 lg:px-14">
      <div className="flex flex-col items-start gap-8 gap-y-20 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="relative flex h-[457px] max-w-[380px] animate-pulse flex-col items-center overflow-hidden rounded-[10px] border-[1px] bg-gray-300 px-8"
          >
            <div className="mt-3 h-[7px] w-[150px] bg-gray-400"></div>
            <div className="mt-1 h-[7px] w-[150px] bg-gray-400"></div>

            <div className="mt-2 h-[5px] w-[50px] bg-gray-400"></div>

            <div className="mt-10 h-[5px] w-[50px] place-self-end bg-gray-400"></div>
            <div className="mt-[2px] h-[5px] w-full bg-gray-400"></div>
            <div className="mt-[1px] h-[5px] w-full bg-gray-400"></div>
            <div className="mt-[1px] h-[5px] w-full bg-gray-400"></div>
            <div className="mt-[1px] h-[5px] w-full bg-gray-400"></div>
            <div className="mt-[1px] h-[5px] w-full bg-gray-400"></div>
            <div className="mt-[1px] h-[5px] w-full bg-gray-400"></div>

            <div className="mt-[50px] h-[5px] w-[50px] place-self-end bg-gray-400"></div>

            <div className="mt-[2px] h-[6px] w-full bg-gray-400"></div>
            <div className="mt-[1px] h-[6px] w-full bg-gray-400"></div>

            <div className="my-1 h-[1px] w-[calc(100%+3rem)] bg-gray-300"></div>

            <div className="mt-10 w-full space-y-2">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-[15px] w-[50px] bg-gray-400"></div>
                  <div className="ml-3 size-[20px] rounded-full bg-gray-400"></div>
                  <div className="size-[20px] rounded-full bg-gray-400"></div>
                  <div className="h-[5px] w-[100px] bg-gray-400"></div>
                </div>
              ))}
            </div>

            <div className="mb-6 mt-auto flex gap-5">
              <div className="h-[28px] w-[123px] rounded-[8px] bg-gray-400"></div>
              <div className="h-[28px] w-[123px] rounded-[8px] bg-gray-400"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FindTeamSkeleton;
