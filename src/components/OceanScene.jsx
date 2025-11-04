import BackgroundImage from "../assets/background.png";
import { scene } from "../config/scene";
export default function OceanScene() {
  return (
    <div
      className="relative h-screen w-screen bg-cover bg-bottom bg-no-repeat z-4 overflow-hidden"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }} >
        
      {scene.map((item, i) => (
        <img
          key={i}
          src={item.src}
          alt={item.name}
          className="absolute"
          style={{
            top: item.top,
            left: item.left,
            height: item.height,
            width: item.width,
            zIndex: item.zindex,
          }}
          />
        ))}
        
   </div>
)
}
