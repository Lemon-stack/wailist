
export default function SmWelcome({user}) {
  return (
    <div className="flex justify-start items-center my-3 text-slate-50 bg-brown/80 rounded-xl shadow-md min-h-14 p-3">
        <img className="size-8 border rounded-full p-1 mr-2" src="/user.svg" alt="" />
     <div className="flex flex-col">
     <span className="text-start text-[0.9rem]">{user.displayName}</span>
     <span className="text-[0.7rem] text-start text-blk">{user.email}</span>
     </div>
    </div>
  )
}
