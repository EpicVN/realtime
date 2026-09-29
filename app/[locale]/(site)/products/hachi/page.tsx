"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutRealtimeHachi from "@/components/Products/About/AboutRealtimeHachi";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import {
  FaBrain,
  FaCodeBranch,
  FaDiagramProject,
  FaRobot,
  FaServer,
  FaStopwatch,
  FaTape,
  FaUserCheck,
  FaMicrophoneLines,
  FaWaveSquare,
  FaArrowRightArrowLeft,
  FaHeadphones,
  FaCalendarCheck,
  FaMoneyCheckDollar,
  FaBullhorn,
} from "react-icons/fa6";

// ==========================================
// 1. PIPELINE SECTION
// ==========================================
const AIPipelineSection = () => {
  const t = useTranslations("Products.RealtimeHachi.Page");

  const steps = [
    {
      icon: <FaMicrophoneLines />,
      title: t("pipeline_step1_title"),
      desc: t("pipeline_step1_desc"),
    },
    {
      icon: <FaBrain />,
      title: t("pipeline_step2_title"),
      desc: t("pipeline_step2_desc"),
    },
    {
      icon: <FaWaveSquare />,
      title: t("pipeline_step3_title"),
      desc: t("pipeline_step3_desc"),
    },
  ];

  return (
    <section className="py-16 bg-blue-50/50 dark:bg-gray-900/30 border-y border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Cơ chế xử lý{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Tự động & Xuyên suốt
            </span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            RealtimeHachi mô phỏng hoàn hảo quy trình giao tiếp của não bộ con
            người.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-5xl mx-auto relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-linear-to-r from-blue-200 via-purple-300 to-blue-200 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 -translate-y-1/2 z-0" />
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="relative z-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-700 flex-1 text-center group"
            >
              <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 2. VOICE SIMULATION SECTION
// ==========================================
const VoiceSimulationSection = () => {
  const t = useTranslations("Products.RealtimeHachi.Page");

  // Hiệu ứng sóng âm thanh
  const renderAudioWave = () => (
    <div className="flex items-center gap-1 h-6">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: ["20%", "100%", "20%"] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          className="w-1 bg-blue-500 rounded-full"
        />
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative">
      <div className="absolute left-0 top-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            {t("sim_title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t("sim_desc")}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Header UI Điện thoại */}
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/30">
                <FaRobot />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  RealtimeHachi
                </h4>
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />{" "}
                  Đang nghe...
                </div>
              </div>
            </div>
            {renderAudioWave()}
          </div>

          {/* Nội dung Chat (Được làm hiệu ứng fade in lên) */}
          <div className="space-y-6">
            {/* User 1 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-end"
            >
              <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                {t("sim_user1")}
              </div>
            </motion.div>

            {/* Bot 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex justify-start"
            >
              <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tl-sm max-w-[80%] shadow-lg shadow-blue-600/20">
                {t("sim_bot1")}
              </div>
            </motion.div>

            {/* User 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="flex justify-end"
            >
              <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                {t("sim_user2")}
              </div>
            </motion.div>

            {/* Bot 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="flex justify-start"
            >
              <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tl-sm max-w-[80%] shadow-lg shadow-blue-600/20">
                {t("sim_bot2")}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden mt-24">
          {/* Header UI Điện thoại */}
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/30">
                <FaRobot />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  RealtimeHachi
                </h4>
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />{" "}
                  Đang nghe...
                </div>
              </div>
            </div>
            {renderAudioWave()}
          </div>

          {/* Nội dung Chat (Được làm hiệu ứng fade in lên) */}
          <div className="space-y-6">
            {/* User 1 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-end"
            >
              <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                {t("sim_user3")}
              </div>
            </motion.div>

            {/* Bot 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex justify-start"
            >
              <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tl-sm max-w-[80%] shadow-lg shadow-blue-600/20">
                {t("sim_bot3")}
              </div>
            </motion.div>

            {/* User 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="flex justify-end"
            >
              <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                {t("sim_user4")}
              </div>
            </motion.div>

            {/* Bot 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="flex justify-start"
            >
              <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tl-sm max-w-[80%] shadow-lg shadow-blue-600/20">
                {t("sim_bot4")}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 3. USE CASES SECTION (BENTO GRID - MỚI)
// ==========================================
const UseCasesSection = () => {
  const t = useTranslations("Products.RealtimeHachi.Page");

  const cases = [
    {
      icon: <FaHeadphones />,
      title: t("uc_cskh_title"),
      desc: t("uc_cskh_desc"),
      color: "from-blue-500 to-cyan-500",
      span: "md:col-span-2",
    },
    {
      icon: <FaBullhorn />,
      title: t("uc_telesales_title"),
      desc: t("uc_telesales_desc"),
      color: "from-purple-500 to-pink-500",
      span: "md:col-span-1",
    },
    {
      icon: <FaCalendarCheck />,
      title: t("uc_booking_title"),
      desc: t("uc_booking_desc"),
      color: "from-orange-500 to-yellow-500",
      span: "md:col-span-1",
    },
    {
      icon: <FaMoneyCheckDollar />,
      title: t("uc_remind_title"),
      desc: t("uc_remind_desc"),
      color: "from-green-500 to-emerald-500",
      span: "md:col-span-2",
    },
  ];

  return (
    <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("usecases_title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("usecases_desc")}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-3xl p-8 text-white ${c.span} bg-linear-to-br ${c.color} shadow-xl group`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity text-8xl transform translate-x-4 -translate-y-4">
                {c.icon}
              </div>
              <div className="relative z-10">
                <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-md mb-6">
                  {c.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{c.title}</h3>
                <p className="text-white/90 leading-relaxed text-sm">
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// MAIN PAGE ASSEMBLE
// ==========================================
const RealtimeHachiPage = () => {
  const t = useTranslations("Products.RealtimeHachi.Page");

  const HACHI_FEATURES: FeatureItem[] = [
    {
      icon: <FaDiagramProject />,
      title: t("feat_flow_title"),
      desc: t("feat_flow_desc"),
    },
    {
      icon: <FaBrain />,
      title: t("feat_intent_title"),
      desc: t("feat_intent_desc"),
    },
    {
      icon: <FaUserCheck />,
      title: t("feat_dynamic_title"),
      desc: t("feat_dynamic_desc"),
    },
    {
      icon: <FaArrowRightArrowLeft />,
      title: t("feat_routing_title"),
      desc: t("feat_routing_desc"),
    },
    {
      icon: <FaServer />,
      title: t("feat_logic_title"),
      desc: t("feat_logic_desc"),
    },
    {
      icon: <FaTape />,
      title: t("feat_record_title"),
      desc: t("feat_record_desc"),
    },
  ];

  const HACHI_STATS: StatItem[] = [
    {
      id: 1,
      value: "95",
      suffix: "%",
      label: t("stat_accuracy"),
      icon: <FaBrain />,
    },
    {
      id: 2,
      value: "500",
      suffix: "ms",
      label: t("stat_latency"),
      icon: <FaStopwatch />,
    },
    {
      id: 3,
      value: "80",
      suffix: "%",
      label: t("stat_automation"),
      icon: <FaRobot />,
    },
    {
      id: 4,
      value: "10k",
      suffix: "+",
      label: t("stat_concurrent"),
      icon: <FaCodeBranch />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden selection:bg-blue-200 dark:selection:bg-blue-900">
      <AboutRealtimeHachi />

      <VoiceSimulationSection />


      <UseCasesSection />

      <AIPipelineSection />

      <div className="relative mt-24">
        <div className="absolute top-40 right-0 w-72 h-72 bg-blue-400/10 dark:bg-blue-900/20 blur-[100px] rounded-full pointer-events-none" />
        <FeatureGrid
          features={HACHI_FEATURES}
          title={t("features_title")}
          description={t("features_desc")}
        />
      </div>

      <StatsSection
        data={HACHI_STATS}
        title={t("stats_title")}
        description={t("stats_desc")}
      />
      <Pricing />
      <FAQ />
      <ContactForm />
      <ContactInfo />
    </div>
  );
};

export default RealtimeHachiPage;
