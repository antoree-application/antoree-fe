import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, BookOpen, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-green-600">antoree</div>
            <nav className="hidden md:flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Giáo viên
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Lộ trình
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Đăng ký làm gia sư
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Về chúng tôi
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Đăng nhập
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" size="sm">
              Học thử miễn phí
            </Button>
            <div className="flex items-center space-x-1">
              <span className="text-sm">Tiếng Việt</span>
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🇻🇳</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 px-4 py-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1 max-w-lg">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tiếng Anh trực tuyến 1 kèm 1<br />
              Giải pháp bứt phá thần tốc
            </h1>
            <p className="text-gray-600 mb-6">
              Học tiếng Anh trực tuyến 1 kèm 1 cùng 3000+ giáo viên chất lượng cao đến từ Anh, Úc, Mỹ, Canada,
              Philippines và Việt Nam.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 px-8 py-3">Học thử miễn phí</Button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <img
                src="/happy-asian-woman-learning-english-online-with-lap.png"
                alt="English learning illustration"
                className="w-96 h-72 object-cover rounded-lg"
              />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">📚</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-900 px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Tăng hiệu quả học Tiếng Anh trực tuyến 1 kèm 1 hàng đầu Việt Nam
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white p-6">
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">LỘ TRÌNH & GIÁO VIÊN CÁ NHÂN</h3>
                <p className="text-sm text-gray-600">
                  Lộ trình học - giáo viên cá nhân được thiết kế riêng cho từng học viên, phù hợp với trình độ và mục
                  tiêu học tập của từng người.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6">
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">PHƯƠNG PHÁP HỌC THỦ CÔNG</h3>
                <p className="text-sm text-gray-600">
                  Học với hơn 3000 giáo viên chất lượng cao đến từ Anh, Úc, Mỹ, Canada, Philippines và Việt Nam.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6">
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">LỊCH HỌC GỌI HỌC VÀ GIÁO</h3>
                <p className="text-sm text-gray-600">
                  Lịch học linh hoạt theo nhu cầu của học viên, có thể học bất cứ lúc nào trong ngày.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6">
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">BÁO CÁO TIẾN ĐỘ HỌC TẬP</h3>
                <p className="text-sm text-gray-600">
                  Học viên được cập nhật báo cáo tiến độ học tập chi tiết, đánh giá năng lực và đề xuất cải thiện.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Những con số biết nói</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">7+</div>
              <div className="text-gray-600">Năm phát triển</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">3.000+</div>
              <div className="text-gray-600">Giáo viên</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">11.000+</div>
              <div className="text-gray-600">Học viên</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">19.000+</div>
              <div className="text-gray-600">Khóa học</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Antoree */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">TẠI SAO HỌC VIÊN CHỌN ANTOREE</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6">
                <img
                  src="/online-learning-focus-concentration-icon.png"
                  alt="Focus learning"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">Tập trung, hiệu quả, tiến bộ nhanh</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Tập trung tối đa giúp bạn ghi nhớ từ vựng nhanh hơn, ngữ pháp dễ hiểu hơn
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Giáo viên tập trung 100% cho bạn, không bị phân tâm bởi học viên khác
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Nhận xét, đánh giá trực tiếp từ giáo viên ngay sau mỗi bài học
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6">
                <img
                  src="/native-english-teacher-speaking.png"
                  alt="Native teacher"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">Học với giáo viên bản ngữ</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Học trực tiếp với các giáo viên bản ngữ từ Anh, Úc, Mỹ, Canada
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Phát âm chuẩn, ngữ điệu tự nhiên
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Hiểu văn hóa, cách dùng từ ngữ trong giao tiếp thực tế
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6">
                <img
                  src="/flexible-schedule-calendar.png"
                  alt="Flexible schedule"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">Đa dạng, linh hoạt, tiết kiệm</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Chọn giáo viên theo sở thích, lịch học theo nhu cầu
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Học mọi lúc, mọi nơi chỉ cần có internet
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Tiết kiệm thời gian và chi phí đi lại
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6">
                <img
                  src="/24-7-customer-support-headphones.png"
                  alt="24/7 support"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">Hỗ trợ 24/7</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Đội ngũ hỗ trợ kỹ thuật 24/7
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Tư vấn học tập từ đội ngũ chuyên gia
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Giải đáp thắc mắc nhanh chóng, tận tình
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button className="bg-green-600 hover:bg-green-700 px-8 py-3">Đăng ký ngay</Button>
          </div>
        </div>
      </section>

      {/* Top Teachers */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">GẶP GỠ NHỮNG GIA SƯ HÀNG ĐẦU</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <img
                  src={`/professional-english-teacher-.png?height=200&width=200&query=professional english teacher ${i}`}
                  alt={`Teacher ${i}`}
                  className="w-48 h-48 object-cover rounded-lg mx-auto mb-4"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button className="bg-green-600 hover:bg-green-700">Xem thêm giáo viên</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">KHÁCH HÀNG NÓI GÌ VỀ ANTOREE</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Bé Hà Mi",
                text: "Bình thường con rất ngại khi nói tiếng Anh, nhưng từ khi học với cô giáo bên Antoree, con đã tự tin hơn rất nhiều. Cô giáo rất vui tính và kiên nhẫn, giúp con học từ vựng và ngữ pháp một cách dễ hiểu. Giờ con có thể nói chuyện bằng tiếng Anh với bạn bè một cách tự nhiên.",
              },
              {
                name: "Chị Thúy Nhàn",
                text: "Sau khi học với Antoree, tôi đã cải thiện đáng kể khả năng giao tiếp tiếng Anh của mình. Các giáo viên rất chuyên nghiệp và phương pháp giảng dạy rất hiệu quả. Tôi cảm thấy tự tin hơn khi sử dụng tiếng Anh trong công việc.",
              },
              {
                name: "Anh Minh Hải",
                text: "Chương trình học của Antoree rất linh hoạt, phù hợp với lịch làm việc bận rộn của tôi. Giáo viên luôn nhiệt tình và tận tâm, giúp tôi cải thiện kỹ năng tiếng Anh một cách nhanh chóng và hiệu quả.",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="p-6">
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img
                      src={`/student-testimonial.png?height=40&width=40&query=student testimonial ${i + 1}`}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">Học viên Antoree</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Feedback Videos */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">CẢM NHẬN CỦA HỌC VIÊN</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="relative">
                <img
                  src="/youtube-video-thumbnail-student-feedback.png"
                  alt="Student feedback video"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">▶</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">Anh Lê Xuân Cường</h3>
                <p className="text-sm text-gray-600">Học viên Antoree</p>
              </div>
            </div>
            <div className="text-center">
              <div className="relative">
                <img
                  src="/youtube-video-thumbnail-english-learning-success.png"
                  alt="Student success video"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">▶</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">Anh Đỗ Thành Nhân</h3>
                <p className="text-sm text-gray-600">Học viên Antoree</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-green-400 mb-4">antoree</div>
              <p className="text-gray-400 text-sm">Nền tảng học tiếng Anh trực tuyến 1 kèm 1 hàng đầu Việt Nam</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Về Antoree</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Điều khoản sử dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Chính sách bảo mật
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kết nối với chúng tôi</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  YouTube
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Antoree. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
