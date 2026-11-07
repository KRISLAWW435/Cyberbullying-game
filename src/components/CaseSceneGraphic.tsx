import React from 'react';
import phone3dImg from '../assets/icons/3d-smartphone.jpg';
import shield3dImg from '../assets/icons/3d-shield.jpg';
import lupa3dImg from '../assets/icons/3d-lupa.jpg';

interface CaseSceneGraphicProps {
  type: 'phone_message' | 'chat_photo' | 'game_dispute' | 'excluded_chat' | 'unknown_sender' | 'passive_bystander';
  className?: string;
}

export const CaseSceneGraphic: React.FC<CaseSceneGraphicProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'phone_message':
      return (
        <div className={`relative flex flex-col sm:flex-row items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#EAF4FF] to-white rounded-3xl border-2 border-[#007BFF]/20 shadow-inner overflow-hidden gap-4 ${className}`}>
          {/* Subtle cyber grid backdrop */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#007BFF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* 3D Pixar Smartphone Graphic */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 shrink-0 flex items-center justify-center">
            <img
              src={phone3dImg}
              alt="3D Смартфон с тревожным сообщением"
              style={{ mixBlendMode: 'multiply' }}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Message Context Card */}
          <div className="flex-1 max-w-sm w-full bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  К
                </div>
                <div>
                  <div className="text-xs font-bold text-[#172B4D]">Игровой чат</div>
                  <div className="text-[10px] text-slate-400">онлайн • новое сообщение</div>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-green-200" />
            </div>

            {/* Message Bubble */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 my-3 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 mb-1">
                <span>⚠️ Тревожное уведомление:</span>
              </div>
              <p className="text-sm text-slate-800 font-semibold italic">
                «Ты здесь никому не нужен, перестань с нами играть!»
              </p>
              <div className="text-[10px] text-right text-slate-400 mt-1">16:42</div>
            </div>

            {/* Bottom shield tip hint */}
            <div className="bg-[#FFF6D8] border border-[#FFD43B] rounded-xl p-2 text-center text-xs text-amber-950 font-bold flex items-center justify-center gap-1.5 shadow-xs">
              <span>🛡️ Сделай паузу. Не отвечай агрессией!</span>
            </div>
          </div>
        </div>
      );

    case 'chat_photo':
      return (
        <div className={`relative flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#FFF6D8] to-white rounded-3xl border-2 border-[#FFD43B]/30 shadow-inner overflow-hidden ${className}`}>
          <div className="w-full max-w-sm bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  ЧАТ
                </div>
                <div>
                  <div className="font-bold text-xs text-[#172B4D]">Школьный класс (24 участника)</div>
                  <div className="text-[10px] text-slate-400">Пересланное фото</div>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                Группа
              </span>
            </div>

            {/* Photo frame with mocking caption */}
            <div className="bg-slate-100 rounded-xl p-2 border border-slate-200">
              <div className="h-28 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-500 relative overflow-hidden">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-[11px] font-semibold text-slate-600 mt-1">[Чужое фото без разрешения]</span>
                <div className="absolute top-1 right-1 bg-red-500 text-white text-[9px] px-2 py-0.5 rounded font-bold shadow-xs">
                  Без спроса!
                </div>
              </div>
              <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg mt-2">
                <p className="text-xs font-bold text-red-600">Обидная подпись с насмешкой</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs font-semibold">
                    😆 14
                  </span>
                  <span className="text-xs bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs font-semibold">
                    💀 8
                  </span>
                  <span className="text-[10px] text-red-600 font-bold ml-auto">Пострадавшему больно!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'game_dispute':
      return (
        <div className={`relative flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#EAF4FF] to-white rounded-3xl border-2 border-[#007BFF]/20 shadow-inner overflow-hidden ${className}`}>
          <div className="w-full max-w-sm bg-white rounded-2xl border-2 border-blue-200 p-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span className="text-xs font-bold text-[#007BFF]">🎮 Онлайн-стратегия: Командный матч</span>
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full">
                Разовый спор
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-2">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm mb-1 shadow-xs">
                  И1
                </div>
                <div className="text-xs font-bold text-[#172B4D]">Макс</div>
                <p className="text-[11px] text-slate-600 italic mt-1 leading-snug">«Нужно было ставить башню слева!»</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm mb-1 shadow-xs">
                  И2
                </div>
                <div className="text-xs font-bold text-[#172B4D]">Артём</div>
                <p className="text-[11px] text-slate-600 italic mt-1 leading-snug">«Нет, справа надежнее, ты не прав!»</p>
              </div>
            </div>

            <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <div className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                <span>🔎 Улика детектива:</span>
              </div>
              <p className="text-xs text-emerald-700 font-medium mt-0.5">
                Один раз поспорили о правилах. Нет травли и унижений. Спор на равных!
              </p>
            </div>
          </div>
        </div>
      );

    case 'excluded_chat':
      return (
        <div className={`relative flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-100 to-white rounded-3xl border-2 border-slate-300 shadow-inner overflow-hidden ${className}`}>
          <div className="w-full max-w-sm bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-xl">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                🔒
              </div>
              <div>
                <div className="font-bold text-xs text-red-600">Секретная группа «Без [Имя]»</div>
                <div className="text-[10px] text-slate-400">Намеренное исключение одноклассника</div>
              </div>
            </div>

            <div className="relative py-3 flex items-center justify-around">
              {/* Group members */}
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xs">
                  У1
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xs">
                  У2
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xs">
                  У3
                </div>
              </div>

              {/* Exclusion wall barrier */}
              <div className="h-14 w-0.5 bg-red-400 dashed border-r-2 border-red-400 mx-2" />

              {/* Excluded sad character */}
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-full bg-slate-200 border-2 border-red-500 flex items-center justify-center text-slate-700 text-base font-bold shadow-xs">
                  😔
                </div>
                <span className="text-[10px] text-red-600 font-bold mt-1">Остался один</span>
              </div>
            </div>

            <div className="mt-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-center">
              <span className="text-xs font-bold text-red-700">🚫 Бойкот и изоляция — опасная форма буллинга!</span>
            </div>
          </div>
        </div>
      );

    case 'unknown_sender':
      return (
        <div className={`relative flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-red-50 to-white rounded-3xl border-2 border-red-300 shadow-inner overflow-hidden ${className}`}>
          <div className="w-full max-w-sm bg-[#172B4D] text-white rounded-2xl p-4 shadow-2xl border-2 border-red-500">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-700 mb-2">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ?
              </div>
              <div>
                <div className="font-bold text-xs text-red-300">Неизвестный пользователь #8492</div>
                <div className="text-[10px] text-slate-400">Пустой профиль, без фото</div>
              </div>
            </div>

            <div className="bg-red-950/80 border border-red-500/50 rounded-xl p-3 my-2.5">
              <div className="text-xs text-red-400 font-bold mb-1">🚨 Угроза и вымогательство пароля:</div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                «Я знаю, в какой школе ты учишься. Если не сделаешь, что я скажу, всем расскажу твой секрет!»
              </p>
            </div>

            <div className="p-2.5 bg-[#FFD43B] text-[#172B4D] rounded-xl text-center font-black text-xs flex items-center justify-center gap-1.5 shadow-md">
              <span>🛑 СТОП! Немедленно зови взрослого!</span>
            </div>
          </div>
        </div>
      );

    case 'passive_bystander':
      return (
        <div className={`relative flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-amber-50 to-white rounded-3xl border-2 border-amber-300 shadow-inner overflow-hidden ${className}`}>
          <div className="w-full max-w-sm bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-xl">
            <div className="text-xs font-bold text-[#172B4D] mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">👀 Наблюдатель в чате</span>
              <span className="text-[10px] text-slate-400 font-semibold">50+ зрителей</span>
            </div>

            <div className="space-y-2 mb-3">
              <div className="bg-red-50 border border-red-100 rounded-xl p-2.5 text-xs">
                <span className="font-bold text-red-600">Агрессор:</span> «Да ты играть вообще не умеешь, нуб!»
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-800">Ты (Наблюдатель):</span> «Поставил 😂»
                </div>
                <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                  Поддержка буллинга?
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-center text-xs text-[#007BFF] font-bold">
              💡 Твой выбор решает: подлить масла в огонь или поддержать друга!
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
