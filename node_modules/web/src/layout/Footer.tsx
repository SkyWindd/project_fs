import { Facebook, Youtube, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10">
      {/* --- Phần chính của footer --- */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Cột 1: Logo + mạng xã hội */}
        <div className="flex flex-col items-start gap-4">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="font-bold text-xl md:text-2xl text-red-600 tracking-wider font-[Birthstone]">
              PIZZAHOUSE
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <a href="#" className="text-blue-600 hover:opacity-80">
              <Facebook size={28} />
            </a>
            <a href="#" className="text-red-600 hover:opacity-80">
              <Youtube size={28} />
            </a>
            <a href="#" className="text-gray-700 hover:opacity-80">
              <Mail size={28} />
            </a>
          </div>
        </div>

        {/* Cột 2: Về chúng tôi */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Về chúng tôi</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><Link to="#">Giới thiệu</Link></li>
            <li><Link to="#">Tầm nhìn và sứ mệnh của chúng tôi</Link></li>
            <li><Link to="#">Giá trị cốt lõi</Link></li>
            <li><Link to="#">An toàn thực phẩm</Link></li>
          </ul>
        </div>

        {/* Cột 3: Vị trí cửa hàng */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Vị trí cửa hàng</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <p className="">273 An Dương Vương, Phường Chợ Quán, Thành phố Hồ Chí Minh </p>
          </ul>
        </div>

        {/* Cột 4: Tải ứng dụng */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Tải ứng dụng</h3>
          <div className="flex flex-col gap-3">
            <a href="#">
              <img
                src="/images/googleplay.png"
                alt="Google Play"
                className="w-36"
              />
            </a>
            <a href="#">
              <img
                src="/images/appstore.png"
                alt="App Store"
                className="w-36"
              />
            </a>
          </div>
        </div>
      </div>

      {/* --- Dòng bản quyền --- */}
      <div className="border-t border-gray-200 text-sm text-gray-600 py-4 px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p>Phiên bản 1.22.C4</p>
        <div className="flex flex-wrap justify-center gap-6 mt-2 md:mt-0">
          <Link to="#" className="hover:text-red-600">Điều khoản và quyền lợi</Link>
          <Link to="#" className="text-red-600 font-medium">Liên hệ chúng tôi 1234 5678 </Link>
        </div>
      </div>
    </footer>
  )
}
