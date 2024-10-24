import BoxButton from "./BoxButton";
import ProfileImage from "./ProfileImage";

export default function NavBar() {
  
  return(
    <nav className="bg-white">      
      <div className="flex items-center">
        <div className="flex gap-x-1.5 mr-4">
          <BoxButton width="88" height="40" radius="8" backgroundColor="white" fontSize="16" disabled={false} onClick={() => {alert('관리')}}>관리</BoxButton>
          <BoxButton width="116" height="40" radius="8" backgroundColor="white" fontSize="16" disabled={false} onClick={() => {alert('초대하기')}}>초대하기</BoxButton>
        </div>
        <div className="flex -space-x-2 mr-8">
          <ProfileImage>Y</ProfileImage>
          <ProfileImage>BEAR</ProfileImage>
          <ProfileImage>+7</ProfileImage>
        </div>
        <ProfileImage>Wooy</ProfileImage>
      </div>
    </nav>
  )
}