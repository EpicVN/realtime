// app/admin/contacts/page.tsx
import { prisma } from "@/lib/prisma";
import { FaFileExcel, FaSearch } from "react-icons/fa";
import Pagination from "@/components/Helper/Pagination";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 6; // Giữ 6 dòng như bạn muốn để vừa khít màn hình

  const skip = (currentPage - 1) * pageSize;

  const [contacts, totalCount] = await Promise.all([
    prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip: skip,
    }),
    prisma.contact.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-9rem)]">
      
      {/* HEADER (Giữ nguyên) */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Quản lý Liên hệ
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Tổng: <strong className="text-blue-600">{totalCount}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
             <input 
               type="text" 
               placeholder="Tìm kiếm..." 
               className="pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white outline-none w-48 md:w-64 transition-all"
             />
             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm whitespace-nowrap">
            <FaFileExcel /> <span className="hidden sm:inline">Excel</span>
          </button>
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col flex-1 overflow-hidden">
        
        {/* SCROLL AREA */}
        <div className="flex-1 overflow-auto relative scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          
          {/* QUAN TRỌNG: Thêm 'table-fixed' để cột không bị phồng */}
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 table-fixed">
            
            <thead className="bg-gray-50 dark:bg-gray-700 uppercase font-bold text-xs text-gray-500 dark:text-gray-200 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-600">
              <tr>
                {/* Đặt độ rộng cứng (w) cho từng cột */}
                <th className="px-4 py-3 w-35">Ngày gửi</th>
                <th className="px-4 py-3 w-40">Họ tên</th>
                <th className="px-4 py-3 w-30">SĐT</th>
                
                {/* Ẩn Email trên màn hình nhỏ, hiện trên màn hình to (md) */}
                <th className="px-4 py-3 w-50 hidden md:table-cell">Email</th> 
                
                <th className="px-4 py-3 w-35">Nhu cầu</th>
                
                {/* Cột Lời nhắn không đặt width cứng để nó tự chiếm phần còn lại, nhưng giới hạn max-width */}
                <th className="px-4 py-3 min-w-37.5">Lời nhắn</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-400">
                     Chưa có dữ liệu.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                    
                    {/* Ngày gửi */}
                    <td className="px-4 py-3 whitespace-nowrap text-xs font-mono">
                      {new Date(contact.createdAt).toLocaleDateString("vi-VN", {
                         day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute:"2-digit"
                      })}
                    </td>

                    {/* Họ tên (Cắt ngắn nếu quá dài) */}
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white truncate" title={contact.name}>
                      {contact.name}
                    </td>

                    {/* SĐT */}
                    <td className="px-4 py-3 text-blue-600 font-mono text-xs">
                        {contact.phone || "-"}
                    </td>

                    {/* Email (Cắt ngắn + Tooltip) */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="truncate max-w-45" title={contact.email}>
                        {contact.email}
                      </div>
                    </td>

                    {/* Nhu cầu */}
                    <td className="px-4 py-3">
                      <span className="inline-block truncate max-w-30 px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800" title={contact.interest || "Tư vấn chung"}>
                        {contact.interest || "Tư vấn chung"}
                      </span>
                    </td>

                    {/* Lời nhắn (Cắt ngắn tối đa) */}
                    <td className="px-4 py-3">
                      <p className="truncate max-w-50 text-gray-500 italic" title={contact.message}>
                        {contact.message || "Không có nội dung"}
                      </p>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center shrink-0">
           <span className="text-xs text-gray-400 hidden sm:inline">
              Hiển thị {contacts.length}/{totalCount}
           </span>
           <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}