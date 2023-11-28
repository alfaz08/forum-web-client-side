import React from 'react';

const MemberShip = () => {
  return (
    <div className=" max-w-7xl mx-auto">

     <div className='bg-amber-400 grid justify-center p-10'>
      <h2 className='font-bold text-4xl text-center'>Become a Premium Gold Member</h2>
      <p className='font-lg text-xl mt-4 text-center'>We offer a premium membership for you to give more
         <br/>posts on our side and enjoy some premium features</p>
     </div>

      <div className='grid grid-cols-1 md:flex justify-center gap-6 mt-6'>
        <div >
        <div className="card w-96 h-96  bg-teal-200 shadow-lg">
     <h2 className='font-bold text-xl mt-2 text-center'>Bronze Member</h2>
  <div className="card-body">
    <h2 className=" text-center font-bold text-4xl p-20">
     FREE 
    </h2>
    <h2 className="text-center text-xl">
      No Credit Required
    </h2>
    <div className="card-actions justify-center">
      <button className='btn btn-warning' disabled>Already Member</button>
    </div>
  </div>
</div>
        </div>

        <div >
        <div className="card w-96 h-96  bg-teal-200 shadow-lg">
     <h2 className='font-bold text-xl mt-2 text-center'>Gold Member</h2>
  <div className="card-body">
    <h2 className=" text-center font-bold text-4xl p-20">
     $1000
    </h2>
    <h2 className="text-center text-xl">
      One Time Payment
    </h2>
    <div className="card-actions justify-center">
      <button className='btn btn-warning hover:text-white hover:bg-black' >Buy Now</button>
    </div>
  </div>
</div>
        </div>


      </div>

    </div>
  );
};

export default MemberShip;