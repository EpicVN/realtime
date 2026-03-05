import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { FaFilter, FaGlobe } from "react-icons/fa";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string }>;
};

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { filter } = await searchParams;

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  let languageCondition: string | undefined = locale;

  if (filter === "all") {
    languageCondition = undefined;
  } else if (filter === "vi") {
    languageCondition = "vi";
  } else if (filter === "en") {
    languageCondition = "en";
  }

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      language: languageCondition,
    },
    orderBy: { createdAt: "desc" },
  });

  const getFilterBtnClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-semibold transition-all border flex items-center justify-center gap-2 flex-1 sm:flex-none ${
      active
        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/30"
        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
    }`;

  return (
    // THAY ĐỔI 1: Tối ưu khoảng cách lề trên (mt-16 sm:mt-24) và padding (px-4 sm:px-6)
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 mt-24 min-h-[60vh]">
      {/* --- HEADER --- */}
      <div className="text-center mb-8">
        {/* THAY ĐỔI 2: Tối ưu chữ Header nhỏ lại trên Mobile (text-2xl sm:text-4xl) */}
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 dark:text-white">
          {t("title")}
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg dark:text-gray-300 max-w-2xl mx-auto px-2">
          {t("subtitle")}
        </p>
      </div>

      {/* --- BỘ LỌC --- */}
      <div className="flex justify-center mb-8 sm:mb-12">
        {/* THAY ĐỔI 3: Cho phép Bộ lọc rớt dòng gọn gàng trên màn hình siêu nhỏ (flex-wrap w-full sm:w-auto) */}
        <div className="inline-flex flex-wrap items-center p-1.5 bg-gray-100 dark:bg-gray-900 rounded-2xl sm:rounded-full gap-2 border border-gray-200 dark:border-gray-800 justify-center w-full sm:w-auto">
          <Link
            href="/posts?filter=all"
            scroll={false}
            className={getFilterBtnClass(filter === "all")}
          >
            <FaGlobe /> {t("filter_all")}
          </Link>
          <Link
            href="/posts?filter=vi"
            scroll={false}
            className={getFilterBtnClass(
              filter === "vi" || (!filter && locale === "vi"),
            )}
          >
            🇻🇳 {t("filter_vi")}
          </Link>
          <Link
            href="/posts?filter=en"
            scroll={false}
            className={getFilterBtnClass(
              filter === "en" || (!filter && locale === "en"),
            )}
          >
            🇬🇧 {t("filter_en")}
          </Link>
        </div>
      </div>

      {/* --- DANH SÁCH BÀI VIẾT --- */}
      {posts.length > 0 ? (
        // Lưới bài viết sẽ tự động thành 1 cột trên Mobile, 2 cột trên Tablet (sm:grid-cols-2), và 3 cột trên PC (lg:grid-cols-3)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <Link
                href={`/posts/${post.slug}`}
                className="block aspect-video sm:h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 relative"
              >
                {post.thumbnail ? (
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized={post.thumbnail?.startsWith("/uploads/")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>No Image</span>
                  </div>
                )}
              </Link>

              {/* THAY ĐỔI 4: Giảm padding thẻ bài viết trên Mobile (p-4 sm:p-6) */}
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3 font-mono">
                  <span>
                    {new Date(post.createdAt).toLocaleDateString(
                      locale === "vi" ? "vi-VN" : "en-US",
                    )}
                  </span>
                  <span>•</span>
                  <span>
                    {post.views} {t("views")}
                  </span>

                  {filter === "all" && (
                    <span
                      className={`ml-auto px-1.5 py-0.5 rounded text-[10px] border ${post.language === "en" ? "text-blue-600 border-blue-200 bg-blue-50" : "text-red-600 border-red-200 bg-red-50"}`}
                    >
                      {post.language === "en" ? "EN" : "VI"}
                    </span>
                  )}
                </div>

                <Link href={`/posts/${post.slug}`} className="block mb-2">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-1">
                  {post.description}
                </p>

                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline mt-auto inline-flex items-center gap-1"
                >
                  {t("read_more")} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-5 sm:p-6 rounded-full mb-4">
            <FaFilter className="text-5xl sm:text-6xl text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2">
            {t("empty_title")}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
            {t("empty_desc")}
          </p>
          <Link
            href="/posts?filter=all"
            className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          >
            {t("view_all")}
          </Link>
        </div>
      )}
    </div>
  );
}
