import React from 'react';

const VisitorCount = () => {
    return (
        <section className="flex flex-col gap-2 items-center px-4 ">
        <div className="flex flex-col items-center gap-5 py-7 px-4 shadow-middleShadow rounded-2xl w-full">
        <p className="text-monoGray6 text-base ">
          홍보 url을 통해서 방문한 고객 수
        </p>
        <div className="flex">
          <p className="text-purpleMainActive text-base font-bold">
            <span className="text-monoGray4 text-sm font-medium">today</span> :
            10 <span className="text-monoGray4 text-sm font-medium">|</span>
          </p>
          <p className="text-monoGray6 text-base">
            &nbsp; <span className="text-monoGray4 text-sm">total :</span> 1000
          </p>
        </div>    
        </div>
        </section>
    );
};

export default VisitorCount;