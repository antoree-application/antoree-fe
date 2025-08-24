"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "vi" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  vi: {
    // Header
    "nav.teachers": "Giáo viên",
    "nav.community": "Cộng đồng",
    "nav.reviews": "Đánh giá của học viên",
    "nav.about": "Về chúng tôi",
    "nav.about.terms": "Về chúng tôi",
    "nav.about.payment": "Thanh toán",
    "nav.about.contact": "Liên hệ",
    "nav.about.help": "Trợ giúp",
    "nav.tryFree": "Học thử MIỄN PHÍ ngay",
    "nav.login": "Đăng nhập",

    // Authentication
    "auth.login.title": "Đăng nhập",
    "auth.login.subtitle": "Chào mừng bạn quay trở lại",
    "auth.login.button": "Đăng nhập",
    "auth.login.loading": "Đang đăng nhập...",
    "auth.login.link": "Đăng nhập",
    "auth.register.title": "Đăng ký",
    "auth.register.subtitle": "Tạo tài khoản mới",
    "auth.register.button": "Đăng ký",
    "auth.register.loading": "Đang đăng ký...",
    "auth.register.link": "Đăng ký",
    "auth.student": "Học viên",
    "auth.teacher": "Giáo viên",
    "auth.email": "Email",
    "auth.password": "Mật khẩu",
    "auth.confirmPassword": "Xác nhận mật khẩu",
    "auth.name": "Họ tên",
    "auth.phone": "Số điện thoại",
    "auth.forgotPassword": "Quên mật khẩu?",
    "auth.noAccount": "Chưa có tài khoản?",
    "auth.hasAccount": "Đã có tài khoản?",
    "auth.acceptTerms": "Tôi đồng ý với",
    "auth.termsLink": "Điều khoản sử dụng",
    "auth.passwordMismatch": "Mật khẩu không khớp",

    // Homepage
    "hero.title": "TÌM GIÁO VIÊN TIẾNG ANH TỐT NHẤT",
    "hero.subtitle": "Tìm giáo viên tiếng Anh tốt nhất trên toàn cầu",
    "search.placeholder": "Bạn muốn học gì?",
    "search.time": "Thời gian",
    "search.format": "Thể",
    "search.other": "Khác",
    "search.findTeacher": "Tìm giáo viên",
    "search.morning": "Sáng",
    "search.afternoon": "Chiều",
    "search.evening": "Tối",
    "search.online": "Online",
    "search.offline": "Offline",
    "search.beginner": "Cơ bản",
    "search.intermediate": "Trung cấp",
    "search.advanced": "Nâng cao",
    "main.currentSearch": "TÌM KIẾM HIỆN TẠI:",
    "sidebar.joinUs": "Tham gia với chúng tôi",
    "sidebar.joinDescription": "Hãy tham gia cộng đồng giáo viên trên toàn cầu và tạo ra cách học trực tuyến mới.",
    "sidebar.becomeTeacher": "Trở thành giáo viên",

    // Footer
    "footer.customerSupport": "HỖ TRỢ KHÁCH HÀNG",
    "footer.serviceInfo": "THÔNG TIN DỊCH VỤ",
    "footer.connect": "KẾT NỐI VỚI ANTOREE",
    "footer.mobileApps": "TẢI ỨNG DỤNG TRÊN ĐIỆN THOẠI",
    "footer.terms": "Điều khoản sử dụng",
    "footer.privacy": "Chính sách bảo mật",
    "footer.refund": "Chính sách hoàn tiền",
    "footer.faqs": "FAQs",
    "footer.commitment": "Cam kết đầu ra",
    "footer.community": "Cộng đồng",

    // Reviews Page
    "reviews.title": "Đây là 33,314 đánh giá từ học viên cho giáo viên của chúng tôi",
    "reviews.previous": "Trang trước",
    "reviews.next": "Trang sau",
    "reviews.course": "Khóa học",
    "reviews.teacher": "Giáo viên",
    "reviews.teachingMethod": "Phương pháp giảng dạy",
    "reviews.courseContent": "Nội dung khóa học",
    "reviews.attitude": "Thái độ",
    "reviews.satisfaction": "Mức độ hài lòng",

    // Terms/About Page
    "terms.title": "Câu chuyện khởi nghiệp",
    "terms.sidebarReviews": "Đánh giá Antoree",
    "terms.sidebarAbout": "Về chúng tôi",
    "terms.sidebarRefund": "Chính sách hoàn tiền",
    "terms.sidebarTerms": "Điều khoản sử dụng",
    "terms.sidebarPrivacy": "Chính sách bảo mật",

    // Payment Page
    "payment.title": "Chọn hình thức thanh toán",
    "payment.warning": "Cảnh báo lừa đảo khi thực hiện thanh toán",
    "payment.description":
      "Antoree chỉ nhận thanh toán qua các kênh chính thống được liệt kê dưới đây và không chịu trách nhiệm với các khoản ngoài kênh này.",
    "payment.step1": "Chọn hình thức thanh toán",
    "payment.step2": "Thông tin thanh toán",
    "payment.step3": "Hoàn tất thanh toán",
    "payment.continue": "Tiếp tục →",
    "payment.bankTransfer": "Chuyển khoản",
    "payment.bankTransferDesc": "Phí chuyển khoản tùy thuộc vào ngân hàng",
    "payment.officePayment": "Đóng học phí tại văn phòng",
    "payment.officeLocation": "TP. Hồ Chí Minh",
    "payment.internationalCard": "Thẻ thanh toán quốc tế",
    "payment.cardSupport": "Chỉ hỗ trợ thẻ Visa, Master, American Express",
    "payment.alepay": "Thanh toán bằng Alepay",
    "payment.alepayDesc": "Hỗ trợ thanh toán ngay hoặc trả góp",
    "payment.payon": "Thanh toán bằng Payon",
    "payment.payonDesc": "Hỗ trợ thanh toán trả góp",
    "payment.success.title": "Thanh toán thành công!",
    "payment.success.message": "Cảm ơn bạn đã tin tưởng và lựa chọn Antoree",
    "payment.success.confirmation": "Chúng tôi đã gửi email xác nhận đến địa chỉ email của bạn",
    "payment.success.details": "Chi tiết thanh toán",
    "payment.success.orderId": "Mã đơn hàng",
    "payment.success.amount": "Số tiền",
    "payment.success.method": "Phương thức thanh toán",
    "payment.success.date": "Ngày thanh toán",
    "payment.success.package": "Gói học",
    "payment.success.packageName": "Gói học 1-on-1 Premium (20 buổi)",
    "payment.success.status": "Trạng thái",
    "payment.success.completed": "Hoàn thành",
    "payment.success.nextSteps": "Các bước tiếp theo",
    "payment.success.step1Title": "Tải hóa đơn",
    "payment.success.step1Desc": "Tải xuống hóa đơn thanh toán để lưu trữ",
    "payment.success.step2Title": "Chọn giáo viên",
    "payment.success.step2Desc": "Duyệt và chọn giáo viên phù hợp với bạn",
    "payment.success.step3Title": "Đặt lịch học",
    "payment.success.step3Desc": "Lên lịch buổi học đầu tiên với giáo viên",
    "payment.success.downloadReceipt": "Tải hóa đơn",
    "payment.success.backToHome": "Về trang chủ",
    "payment.success.contactSupport": "Liên hệ hỗ trợ",
    "payment.success.supportText": "Cần hỗ trợ? Liên hệ với chúng tôi:",

    // Contact Page
    "contact.title": "Liên hệ",
    "contact.subtitle":
      "Antoree trân trọng mọi ý kiến đóng góp của bạn. Đừng ngại liên hệ khi bạn có bất kỳ câu hỏi nào",
    "contact.sendContact": "GỬI LIÊN HỆ",
    "contact.name": "Họ tên",
    "contact.namePlaceholder": "Nhập họ tên của bạn",
    "contact.email": "Email",
    "contact.emailPlaceholder": "Nhập email của bạn",
    "contact.phone": "Điện thoại liên hệ",
    "contact.phonePlaceholder": "Nhập số điện thoại",
    "contact.message": "Nội dung",
    "contact.messagePlaceholder": "Nhập nội dung tin nhắn của bạn",
    "contact.send": "GỬI",
    "contact.feedbackTitle": "PHẢN HỒI CHẤT LƯỢNG DỊCH VỤ",
    "contact.officeTitle": "Văn phòng Antoree",
    "contact.officeDesc": "Không gian làm việc hiện đại và chuyên nghiệp",

    // FAQ Page
    "faq.title": "Top Questions",
    "faq.question1": "Tôi nên nói Tiếng Anh như thế nào?",
    "faq.popularTopics": "Popular topics",
    "faq.courses": "Khóa học trên Antoree",
    "faq.learning": "Học trên trên Antoree",
    "faq.teachers": "Giáo viên trên Antoree",
    "faq.other": "Khác",

    // Teacher Authentication
    "teacher.login.title": "Đăng nhập dành cho Giáo viên",
    "teacher.login.subtitle": "Chào mừng giáo viên quay trở lại",
    "teacher.login.welcome": "Chào mừng bạn đến với Antoree",
    "teacher.login.description": "Nền tảng giảng dạy trực tuyến hàng đầu",

    // Teacher Dashboard
    "teacher.dashboard.title": "Bảng điều khiển Giáo viên",
    "teacher.dashboard.welcome": "Chào mừng trở lại",

    // Teacher Bookings
    "teacher.bookings.title": "Yêu cầu đặt lịch",
    "teacher.bookings.pending": "Đang chờ",
    "teacher.bookings.confirmed": "Đã xác nhận",
    "teacher.bookings.completed": "Hoàn thành",

    // Teacher Schedule
    "teacher.schedule.title": "Lịch giảng dạy",
    "teacher.schedule.today": "Hôm nay",
    "teacher.schedule.week": "Tuần này",
    "teacher.schedule.month": "Tháng này",

    // Teacher Students
    "teacher.students.title": "Học viên của tôi",
    "teacher.students.active": "Đang học",
    "teacher.students.completed": "Đã hoàn thành",
    "teacher.students.total": "Tổng số học viên",
  },
  en: {
    // Header
    "nav.teachers": "Teachers",
    "nav.community": "Community",
    "nav.reviews": "Student Reviews",
    "nav.about": "About Us",
    "nav.about.terms": "About Us",
    "nav.about.payment": "Payment",
    "nav.about.contact": "Contact",
    "nav.about.help": "Help",
    "nav.tryFree": "Try FREE Now",
    "nav.login": "Login",

    // Authentication
    "auth.login.title": "Login",
    "auth.login.subtitle": "Welcome back",
    "auth.login.button": "Login",
    "auth.login.loading": "Logging in...",
    "auth.login.link": "Login",
    "auth.register.title": "Register",
    "auth.register.subtitle": "Create new account",
    "auth.register.button": "Register",
    "auth.register.loading": "Registering...",
    "auth.register.link": "Register",
    "auth.student": "Student",
    "auth.teacher": "Teacher",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.name": "Full Name",
    "auth.phone": "Phone Number",
    "auth.forgotPassword": "Forgot password?",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "auth.acceptTerms": "I agree to the",
    "auth.termsLink": "Terms of Service",
    "auth.passwordMismatch": "Passwords do not match",

    // Homepage
    "hero.title": "FIND THE BEST ENGLISH TEACHERS",
    "hero.subtitle": "Find the best English teachers worldwide",
    "search.placeholder": "What do you want to learn?",
    "search.time": "Time",
    "search.format": "Format",
    "search.other": "Other",
    "search.findTeacher": "Find Teacher",
    "search.morning": "Morning",
    "search.afternoon": "Afternoon",
    "search.evening": "Evening",
    "search.online": "Online",
    "search.offline": "Offline",
    "search.beginner": "Beginner",
    "search.intermediate": "Intermediate",
    "search.advanced": "Advanced",
    "main.currentSearch": "CURRENT SEARCH:",
    "sidebar.joinUs": "Join Us",
    "sidebar.joinDescription": "Join our global community of teachers and create new ways of online learning.",
    "sidebar.becomeTeacher": "Become a Teacher",

    // Footer
    "footer.customerSupport": "CUSTOMER SUPPORT",
    "footer.serviceInfo": "SERVICE INFORMATION",
    "footer.connect": "CONNECT WITH ANTOREE",
    "footer.mobileApps": "DOWNLOAD MOBILE APP",
    "footer.terms": "Terms of Use",
    "footer.privacy": "Privacy Policy",
    "footer.refund": "Refund Policy",
    "footer.faqs": "FAQs",
    "footer.commitment": "Learning Commitment",
    "footer.community": "Community",

    // Reviews Page
    "reviews.title": "Here are 33,314 reviews from students for our teachers",
    "reviews.previous": "Previous",
    "reviews.next": "Next",
    "reviews.course": "Course",
    "reviews.teacher": "Teacher",
    "reviews.teachingMethod": "Teaching Method",
    "reviews.courseContent": "Course Content",
    "reviews.attitude": "Attitude",
    "reviews.satisfaction": "Satisfaction Level",

    // Terms/About Page
    "terms.title": "Startup Story",
    "terms.sidebarReviews": "Antoree Reviews",
    "terms.sidebarAbout": "About Us",
    "terms.sidebarRefund": "Refund Policy",
    "terms.sidebarTerms": "Terms of Use",
    "terms.sidebarPrivacy": "Privacy Policy",

    // Payment Page
    "payment.title": "Choose Payment Method",
    "payment.warning": "Fraud warning when making payment",
    "payment.description":
      "Antoree only accepts payments through official channels listed below and is not responsible for payments outside these channels.",
    "payment.step1": "Choose Payment Method",
    "payment.step2": "Payment Information",
    "payment.step3": "Complete Payment",
    "payment.continue": "Continue →",
    "payment.bankTransfer": "Bank Transfer",
    "payment.bankTransferDesc": "Transfer fees depend on the bank",
    "payment.officePayment": "Pay tuition at office",
    "payment.officeLocation": "Ho Chi Minh City",
    "payment.internationalCard": "International Payment Card",
    "payment.cardSupport": "Only supports Visa, Master, American Express cards",
    "payment.alepay": "Pay with Alepay",
    "payment.alepayDesc": "Supports immediate payment or installment",
    "payment.payon": "Pay with Payon",
    "payment.payonDesc": "Supports installment payment",
    "payment.success.title": "Payment Successful!",
    "payment.success.message": "Thank you for trusting and choosing Antoree",
    "payment.success.confirmation": "We have sent a confirmation email to your email address",
    "payment.success.details": "Payment Details",
    "payment.success.orderId": "Order ID",
    "payment.success.amount": "Amount",
    "payment.success.method": "Payment Method",
    "payment.success.date": "Payment Date",
    "payment.success.package": "Learning Package",
    "payment.success.packageName": "1-on-1 Premium Package (20 sessions)",
    "payment.success.status": "Status",
    "payment.success.completed": "Completed",
    "payment.success.nextSteps": "Next Steps",
    "payment.success.step1Title": "Download Receipt",
    "payment.success.step1Desc": "Download your payment receipt for records",
    "payment.success.step2Title": "Choose Teacher",
    "payment.success.step2Desc": "Browse and select a teacher that suits you",
    "payment.success.step3Title": "Schedule Lesson",
    "payment.success.step3Desc": "Schedule your first lesson with the teacher",
    "payment.success.downloadReceipt": "Download Receipt",
    "payment.success.backToHome": "Back to Home",
    "payment.success.contactSupport": "Contact Support",
    "payment.success.supportText": "Need help? Contact us:",

    // Contact Page
    "contact.title": "Contact",
    "contact.subtitle": "Antoree values all your feedback. Don't hesitate to contact us if you have any questions",
    "contact.sendContact": "SEND CONTACT",
    "contact.name": "Full Name",
    "contact.namePlaceholder": "Enter your full name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "Enter your email",
    "contact.phone": "Contact Phone",
    "contact.phonePlaceholder": "Enter phone number",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Enter your message content",
    "contact.send": "SEND",
    "contact.feedbackTitle": "SERVICE QUALITY FEEDBACK",
    "contact.officeTitle": "Antoree Office",
    "contact.officeDesc": "Modern and professional workspace",

    // FAQ Page
    "faq.title": "Top Questions",
    "faq.question1": "How should I speak English?",
    "faq.popularTopics": "Popular topics",
    "faq.courses": "Courses on Antoree",
    "faq.learning": "Learning on Antoree",
    "faq.teachers": "Teachers on Antoree",
    "faq.other": "Other",

    // Teacher Authentication
    "teacher.login.title": "Teacher Login",
    "teacher.login.subtitle": "Welcome back, Teacher",
    "teacher.login.welcome": "Welcome to Antoree",
    "teacher.login.description": "Leading online teaching platform",

    // Teacher Dashboard
    "teacher.dashboard.title": "Teacher Dashboard",
    "teacher.dashboard.welcome": "Welcome back",

    // Teacher Bookings
    "teacher.bookings.title": "Booking Requests",
    "teacher.bookings.pending": "Pending",
    "teacher.bookings.confirmed": "Confirmed",
    "teacher.bookings.completed": "Completed",

    // Teacher Schedule
    "teacher.schedule.title": "Teaching Schedule",
    "teacher.schedule.today": "Today",
    "teacher.schedule.week": "This Week",
    "teacher.schedule.month": "This Month",

    // Teacher Students
    "teacher.students.title": "My Students",
    "teacher.students.active": "Active",
    "teacher.students.completed": "Completed",
    "teacher.students.total": "Total Students",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("antoree-language") as Language
    if (savedLanguage && (savedLanguage === "vi" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem("antoree-language", language)
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
