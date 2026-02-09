"use client";

import { useState } from "react";
import { createSpeech } from "@/app/actions/tts";
import { 
  FaPlay, 
  FaSpinner, 
  FaDownload, 
  FaMicrophoneLines, 
  FaUserAstronaut, 
  FaUserTie, 
  FaWandMagicSparkles,
  FaFileLines 
} from "react-icons/fa6";

const SAMPLE_TEXT = `Chào ông bà, hợp đồng tín dụng của ông bà Đặng Châu đang vi phạm với Công ty tài chính shb, đã được chuyển sang công ty Luật Hoàng Kim để giải quyết. Số tiền nợ quá hạn tính đến ngày 1 tháng 8 năm 2026 là 12500000 đồng, yêu cầu ông bà thanh toán khoản vay trước ngày 1 tháng 8 năm 2026, để tránh phát sinh lãi phạt. Để được tư vấn giải quyết ông bà liên hệ với luật sư Hoàng Kim theo số điện thoại 0 3 8 6 9 2 3 9 0 1, xin nhắc lại số điện thoại liên hệ 0 3 8 6 9 2 3 9 0 1. Xin cảm ơn.`;

export default function TextToSpeechTool() {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("ngochuyen");

  // 🔴 SỬA LẠI HÀM NÀY: Nhận sự kiện FormEvent thay vì FormData
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // 1. Chặn reload trang mặc định
    
    if (loading) return; // 2. Chốt chặn cuối cùng: Nếu đang loading thì không làm gì cả

    setLoading(true); // 3. Update UI ngay lập tức
    setError(null);
    setAudioUrl(null);

    // 4. Lấy dữ liệu từ form thủ công
    const formData = new FormData(e.currentTarget);

    try {
      const result = await createSpeech(formData);

      if (result.error) {
        setError(result.error);
      } else if (result.filename) {
        const cleanUrl = `/api/audio/${result.filename}?t=${Date.now()}`;
        setAudioUrl(cleanUrl);
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto mb-48 mt-24">
      
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
          <FaMicrophoneLines size={20} />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Realtime AI Studio
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="grid md:grid-cols-12">
          
          <div className="md:col-span-7 p-6 border-b md:border-b-0 md:border-r border-slate-100">
            {/* 🔴 SỬA TẠI ĐÂY: Dùng onSubmit thay vì action */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <input type="hidden" name="voice" value={selectedVoice} />

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  Chọn giọng đọc
                </label>
                <div className="grid grid-cols-2 gap-3">
                  
                  <div 
                    onClick={() => setSelectedVoice("ngochuyen")}
                    className={`cursor-pointer rounded-lg p-3 border transition-all flex items-center gap-3 ${
                      selectedVoice === "ngochuyen" 
                      ? "border-pink-500 bg-pink-50 ring-1 ring-pink-200" 
                      : "border-slate-200 hover:border-pink-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`p-2 rounded-full ${selectedVoice === "ngochuyen" ? "bg-pink-100 text-pink-600" : "bg-slate-100 text-slate-400"}`}>
                      <FaUserAstronaut size={18} />
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${selectedVoice === "ngochuyen" ? "text-pink-700" : "text-slate-700"}`}>Ngọc Huyền</div>
                      <div className="text-[10px] text-slate-400">Nữ • Miền Bắc</div>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedVoice("chieuthanh")}
                    className={`cursor-pointer rounded-lg p-3 border transition-all flex items-center gap-3 ${
                      selectedVoice === "chieuthanh" 
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-200" 
                      : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`p-2 rounded-full ${selectedVoice === "chieuthanh" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"}`}>
                      <FaUserTie size={18} />
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${selectedVoice === "chieuthanh" ? "text-blue-700" : "text-slate-700"}`}>Chiêu Thành</div>
                      <div className="text-[10px] text-slate-400">Nam • Miền Nam</div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Nội dung kịch bản
                  </label>
                  
                  <div className="flex items-center gap-2">
                    <button
                        type="button" 
                        onClick={() => setText(SAMPLE_TEXT)}
                        className="text-[10px] flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors font-semibold"
                    >
                        <FaFileLines /> Tạo mẫu thử
                    </button>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        {text.length} ký tự
                    </span>
                  </div>
                </div>
                
                <textarea
                  name="text"
                  rows={6} 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-3 text-sm text-slate-700 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none transition-all placeholder:text-slate-300 leading-relaxed"
                  placeholder="Nhập nội dung cần chuyển đổi..."
                  required
                ></textarea>
              </div>

              {loading ? (
                <div className="w-full py-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center gap-3 cursor-wait shadow-inner">
                   <FaSpinner className="animate-spin text-blue-600" size={20} />
                   <span className="text-sm font-bold text-slate-500 animate-pulse">
                     Đang khởi tạo âm thanh...
                   </span>
                </div>
              ) : (
                <button
                  type="submit" // 🔴 Đảm bảo type là submit
                  disabled={!text} 
                  className="w-full group relative bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
                  <div className="relative flex items-center justify-center gap-2 text-sm uppercase tracking-wide">
                    <FaWandMagicSparkles /> Tạo giọng đọc
                  </div>
                </button>
              )}

            </form>
          </div>

          <div className="md:col-span-5 bg-slate-50 p-6 flex flex-col justify-center items-center border-l border-slate-100 min-h-75 md:min-h-0">
            
            {!audioUrl && !loading && !error && (
              <div className="text-center text-slate-400">
                <div className="bg-white p-4 rounded-full inline-block shadow-sm mb-3">
                  <FaPlay size={24} className="pl-1 opacity-20" />
                </div>
                <p className="text-xs font-medium">Kết quả hiển thị tại đây</p>
              </div>
            )}

            {loading && (
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-blue-600 text-sm font-bold animate-pulse">Đang xử lý...</p>
              </div>
            )}

            {error && (
              <div className="w-full bg-red-50 border border-red-100 rounded-lg p-3 text-center animate-fade-in">
                <div className="text-red-500 font-bold text-sm mb-1">Lỗi!</div>
                <p className="text-xs text-red-600 opacity-80 wrap-break-word">{error}</p>
              </div>
            )}

            {audioUrl && (
              <div className="w-full animate-fade-in-up">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
                  <div className="flex items-center gap-2 mb-3 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-bold text-xs uppercase">Hoàn tất</span>
                  </div>

                  <audio 
                    key={audioUrl} 
                    controls 
                    className="w-full mb-4 h-8 accent-blue-600" 
                    autoPlay
                  >
                    <source src={audioUrl} type="audio/wav" />
                  </audio>

                  <a 
                    href={audioUrl} 
                    download={audioUrl.split('/').pop()?.split('?')[0]}
                    target="_blank"
                    className="flex items-center justify-center gap-2 w-full py-2 border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-lg text-sm font-medium text-slate-600 transition-colors bg-slate-50 hover:bg-white"
                  >
                    <FaDownload size={14} /> Tải về
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-xs text-slate-400">Powered by Realtime Solutions AI</p>
      </div>
    </div>
  );
}