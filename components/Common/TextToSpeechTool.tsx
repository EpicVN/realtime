"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBackwardStep,
  FaForwardStep,
  FaHeadphones,
  FaMicrophoneLines,
  FaPause,
  FaPlay,
  FaWandMagicSparkles,
} from "react-icons/fa6";

type AccentFilter = "all" | "north" | "south";

interface VoiceSample {
  id: number;
  speaker: string;
  initials: string;
  genderKey: "female" | "male";
  accentKey: "north" | "south";
  useCaseKey: string;
  audioSrc: string;
  avatarGradient: string;
  ringColor: string;
}

const VOICE_SAMPLES: VoiceSample[] = [
  {
    id: 1,
    speaker: "Ngọc Lan",
    initials: "NL",
    genderKey: "female",
    accentKey: "north",
    useCaseKey: "uc_cskh_remind_tele",
    audioSrc: "/audio/tts/test_000.wav",
    avatarGradient: "from-blue-500 to-cyan-400",
    ringColor: "ring-blue-500/30",
  },
  {
    id: 2,
    speaker: "Minh Anh",
    initials: "MA",
    genderKey: "female",
    accentKey: "north",
    useCaseKey: "uc_cskh_remind_promo",
    audioSrc: "/audio/tts/test_001.wav",
    avatarGradient: "from-indigo-500 to-purple-500",
    ringColor: "ring-indigo-500/30",
  },
  {
    id: 3,
    speaker: "Quang Huy",
    initials: "QH",
    genderKey: "male",
    accentKey: "north",
    useCaseKey: "uc_cskh_promo",
    audioSrc: "/audio/tts/test_002.wav",
    avatarGradient: "from-sky-600 to-blue-700",
    ringColor: "ring-sky-500/30",
  },
  {
    id: 4,
    speaker: "Thu Hà",
    initials: "TH",
    genderKey: "female",
    accentKey: "north",
    useCaseKey: "uc_cskh_promo",
    audioSrc: "/audio/tts/test_003.wav",
    avatarGradient: "from-teal-500 to-emerald-500",
    ringColor: "ring-teal-500/30",
  },
  {
    id: 5,
    speaker: "Yến Nhi",
    initials: "YN",
    genderKey: "female",
    accentKey: "south",
    useCaseKey: "uc_survey",
    audioSrc: "/audio/tts/test_004.wav",
    avatarGradient: "from-amber-500 to-orange-500",
    ringColor: "ring-amber-500/30",
  },
];

const WAVE_BARS = [
  22, 38, 55, 32, 74, 90, 48, 66, 84, 40, 96, 72, 50, 88, 64, 92, 46, 78, 58,
  86, 42, 70, 52, 80, 36, 60, 44, 26,
];

const SPEEDS = [0.75, 1, 1.25];

function formatTime(sec: number) {
  if (!isFinite(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function TextToSpeechTool() {
  const t = useTranslations("TTS");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loadedIdRef = useRef<number | null>(null);

  const [activeId, setActiveId] = useState<number>(VOICE_SAMPLES[0].id);
  const [filter, setFilter] = useState<AccentFilter>("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const activeSample =
    VOICE_SAMPLES.find((v) => v.id === activeId) ?? VOICE_SAMPLES[0];

  const filteredVoices = useMemo(() => {
    if (filter === "all") return VOICE_SAMPLES;
    return VOICE_SAMPLES.filter((v) => v.accentKey === filter);
  }, [filter]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && loadedIdRef.current === null) {
      audio.src = VOICE_SAMPLES[0].audioSrc;
      loadedIdRef.current = VOICE_SAMPLES[0].id;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const playVoice = (sample: VoiceSample) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (loadedIdRef.current === sample.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.playbackRate = playbackRate;
        audio.play().catch(() => setIsPlaying(false));
        setIsPlaying(true);
      }
      return;
    }

    audio.pause();
    audio.src = sample.audioSrc;
    audio.currentTime = 0;
    audio.playbackRate = playbackRate;
    loadedIdRef.current = sample.id;
    setActiveId(sample.id);
    setCurrentTime(0);
    setDuration(0);

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  const handleStep = (direction: -1 | 1) => {
    const list = filteredVoices.length > 0 ? filteredVoices : VOICE_SAMPLES;
    const currentIdx = list.findIndex((v) => v.id === activeId);
    const nextIdx =
      currentIdx === -1
        ? 0
        : (currentIdx + direction + list.length) % list.length;
    playVoice(list[nextIdx]);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTime = Number(e.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleWaveClick = (barIndex: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const nextTime = (barIndex / WAVE_BARS.length) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
    if (!isPlaying) {
      audio.playbackRate = playbackRate;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const cycleSpeed = () => {
    const idx = SPEEDS.indexOf(playbackRate);
    setPlaybackRate(SPEEDS[(idx + 1) % SPEEDS.length]);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const filterTabs: { key: AccentFilter; label: string }[] = [
    { key: "all", label: t("filter_all") },
    { key: "north", label: t("accent_north") },
    { key: "south", label: t("accent_south") },
  ];

  const activeTags = t(activeSample.useCaseKey).split(" - ");

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 my-24">
      <audio ref={audioRef} preload="metadata" />

      {/* --- HEADER --- */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
          <FaWandMagicSparkles className="text-xs" />
          <span>Realtime AI Voice Studio</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {t("title")}
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* --- STUDIO BENTO CONTAINER --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ================= CỘT TRÁI: LIVE AUDIO CONSOLE (5 CỘT) ================= */}
        <div className="lg:col-span-5 relative rounded-3xl bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-7 sm:p-8 shadow-2xl shadow-blue-950/20 overflow-hidden flex flex-col justify-between border border-slate-800">
          <div
            className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl transition-all duration-700 pointer-events-none bg-blue-500/30 ${
              isPlaying ? "opacity-100 scale-110" : "opacity-40"
            }`}
          />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-blue-200">
              <span className="relative flex h-2 w-2">
                {isPlaying && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isPlaying ? "bg-emerald-400" : "bg-blue-400"
                  }`}
                />
              </span>
              <span>{isPlaying ? t("now_playing") : t("ready_to_play")}</span>
            </div>

            <button
              type="button"
              onClick={cycleSpeed}
              title={t("speed_label")}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono font-bold text-white transition-colors cursor-pointer"
            >
              {playbackRate}x
            </button>
          </div>

          {/* Thông tin Speaker */}
          <div className="relative z-10 flex flex-col items-center text-center my-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSample.id}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-4">
                  {isPlaying && (
                    <motion.div
                      animate={{
                        scale: [1, 1.28, 1],
                        opacity: [0.55, 0, 0.55],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-full bg-linear-to-br ${activeSample.avatarGradient} blur-md`}
                    />
                  )}
                  <div
                    className={`relative w-20 h-20 rounded-full bg-linear-to-br ${activeSample.avatarGradient} flex items-center justify-center text-2xl font-extrabold text-white shadow-xl ring-4 ring-white/15`}
                  >
                    {activeSample.initials}
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold tracking-tight text-white mb-1.5">
                  {activeSample.speaker}
                </h3>

                <div className="flex items-center gap-2 text-xs font-medium text-blue-200 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10">
                    {t(`gender_${activeSample.genderKey}`)}
                  </span>
                  <span>•</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10">
                    {t(`accent_${activeSample.accentKey}`)}
                  </span>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5">
                  {activeTags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-blue-500/20 border border-blue-400/25 text-[11px] font-medium text-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sóng âm tương tác (Click để tua) */}
          <div
            className="relative z-10 h-16 flex items-center justify-center gap-1 my-6 px-2"
            role="group"
            aria-label="Audio waveform"
          >
            {WAVE_BARS.map((height, idx) => {
              const barPercent = (idx / WAVE_BARS.length) * 100;
              const isPassed = barPercent <= progressPercent;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleWaveClick(idx)}
                  className="h-full flex items-center px-px cursor-pointer group/bar focus:outline-none"
                  aria-label={`Seek to ${Math.round(barPercent)}%`}
                >
                  <motion.span
                    animate={
                      isPlaying
                        ? {
                            height: [
                              `${Math.max(18, height * 0.45)}%`,
                              `${height}%`,
                              `${Math.max(15, height * 0.35)}%`,
                            ],
                          }
                        : { height: `${Math.max(16, height * 0.45)}%` }
                    }
                    transition={
                      isPlaying
                        ? {
                            duration: 0.65 + (idx % 5) * 0.12,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                            delay: (idx % 7) * 0.06,
                          }
                        : { duration: 0.3 }
                    }
                    className={`w-1 sm:w-1.5 rounded-full transition-colors duration-200 group-hover/bar:bg-cyan-300 ${
                      isPassed
                        ? "bg-linear-to-t from-blue-400 to-cyan-300"
                        : isPlaying
                          ? "bg-white/40"
                          : "bg-white/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Thanh tiến độ & cụm điều khiển */}
          <div className="relative z-10 space-y-4">
            <div className="space-y-1.5">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 pt-1">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Previous voice"
              >
                <FaBackwardStep size={14} />
              </button>

              <button
                type="button"
                onClick={() => playVoice(activeSample)}
                className="w-14 h-14 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label={isPlaying ? t("btn_pause") : t("btn_listen")}
              >
                {isPlaying ? (
                  <FaPause size={18} />
                ) : (
                  <FaPlay size={18} className="pl-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleStep(1)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Next voice"
              >
                <FaForwardStep size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= CỘT PHẢI: BỘ LỌC + VOICE GALLERY (7 CỘT) ================= */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-gray-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div>
            {/* Thanh Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-gray-800">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white">
                <FaHeadphones className="text-blue-600 dark:text-blue-400" />
                <span>
                  {filteredVoices.length} {t("voices_count")}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-gray-800 p-1 rounded-xl">
                {filterTabs.map((tab) => {
                  const isActiveTab = filter === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setFilter(tab.key)}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        isActiveTab
                          ? "text-blue-600 dark:text-white"
                          : "text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200"
                      }`}
                    >
                      {isActiveTab && (
                        <motion.span
                          layoutId="ttsFilterPill"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 32,
                          }}
                          className="absolute inset-0 bg-white dark:bg-blue-600 rounded-lg shadow-sm"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lưới 2 cột cân đối (thẻ cuối tự trải ngang nếu tổng số lẻ) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredVoices.map((sample, idx) => {
                const isSelected = activeId === sample.id;
                const isCurrentPlaying = isSelected && isPlaying;
                const tags = t(sample.useCaseKey).split(" - ");
                const isLastOdd =
                  filteredVoices.length % 2 !== 0 &&
                  idx === filteredVoices.length - 1;

                return (
                  <motion.div
                    layout
                    key={sample.id}
                    onClick={() => playVoice(sample)}
                    whileHover={{ y: -2 }}
                    className={`group relative rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isLastOdd ? "sm:col-span-2" : ""
                    } ${
                      isSelected
                        ? `bg-blue-50/70 dark:bg-blue-950/30 border-blue-500 dark:border-blue-500 ring-4 ${sample.ringColor}`
                        : "bg-slate-50/60 dark:bg-gray-800/40 border-slate-200/80 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-white dark:hover:bg-gray-800/80"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-xl bg-linear-to-br ${sample.avatarGradient} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm`}
                        >
                          {sample.initials}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                              {sample.speaker}
                            </h4>
                            {isCurrentPlaying && (
                              <span className="inline-flex items-end gap-0.5 h-3 shrink-0">
                                <span className="w-0.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" />
                                <span className="w-0.5 h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:120ms]" />
                                <span className="w-0.5 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:240ms]" />
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-semibold text-slate-500 dark:text-gray-400">
                            <span>{t(`gender_${sample.genderKey}`)}</span>
                            <span>•</span>
                            <span
                              className={
                                sample.accentKey === "south"
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-blue-600 dark:text-blue-400"
                              }
                            >
                              {t(`accent_${sample.accentKey}`)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playVoice(sample);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                          isCurrentPlaying
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                            : "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 border border-slate-200 dark:border-gray-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                        }`}
                        aria-label={
                          isCurrentPlaying ? t("btn_pause") : t("btn_listen")
                        }
                      >
                        {isCurrentPlaying ? (
                          <FaPause size={11} />
                        ) : (
                          <FaPlay size={11} className="pl-0.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60 dark:border-gray-700/60">
                      {tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-gray-900/70 border border-slate-200/80 dark:border-gray-700 text-[11px] font-medium text-slate-600 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Ghi chú cuối khung phải */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 dark:text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <FaMicrophoneLines className="text-blue-500" />
              {t("click_hint")}
            </span>
            <span>{t("footer")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
