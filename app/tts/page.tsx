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
  FaWandMagicSparkles 
} from "react-icons/fa6";

export default function TextToSpeechPage() {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("ngochuyen");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setAudioUrl(null);

    const result = await createSpeech(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.filename) {
      // Tự tạo link sạch: /api/audio/speech_01.wav
      // Thêm timestamp để fix lỗi cache
      const cleanUrl = `/api/audio/${result.filename}?t=${Date.now()}`;
      setAudioUrl(cleanUrl);
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-6 px-4 font-sans">
      <div className="max-w-5xl w-full mx-auto">
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
            <FaMicrophoneLines size={20} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Realtime AI Studio
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid md:grid-cols-12">
            
            <div className="md:col-span-7 p-6 border-b md:border-b-0 md:border-r border-slate-100">
              <form action={handleSubmit} className="space-y-5">
                
                {/* 🔥 QUAN TRỌNG: Input ẩn chứa giá trị thật sự gửi đi */}
                {/* Đây là nguồn sự thật duy nhất (Single Source of Truth) */}
                <input type="hidden" name="voice" value={selectedVoice} />

                {/* 1. CHỌN GIỌNG ĐỌC (Chỉ là giao diện, không phải Input) */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                    Chọn giọng đọc
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Card Ngọc Huyền */}
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

                    {/* Card Chiêu Thành */}
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

                {/* 2. NHẬP VĂN BẢN */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Nội dung kịch bản
                    </label>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{text.length} ký tự</span>
                  </div>
                  <textarea
                    name="text"
                    rows={5} 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-3 text-sm text-slate-700 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none transition-all placeholder:text-slate-300"
                    placeholder="Nhập nội dung cần chuyển đổi..."
                    required
                  ></textarea>
                </div>

                {/* 3. NÚT SUBMIT */}
                <button
                  disabled={loading || !text}
                  className="w-full group relative bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
                  <div className="relative flex items-center justify-center gap-2 text-sm uppercase tracking-wide">
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" /> Đang xử lý...
                      </>
                    ) : (
                      <>
                        <FaWandMagicSparkles /> Tạo giọng đọc
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>

            {/* CỘT PHẢI: KẾT QUẢ */}
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
                      download
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
    </div>
  );
}