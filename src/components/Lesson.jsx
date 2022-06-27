import { CheckCircle, Lock } from "phosphor-react";
import { Link } from "react-router-dom";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useParams } from "react-router-dom";

export function Lesson(props) {
  const { slug } = useParams();
  const lessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR,
    }
  );

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${
          isActiveLesson && "bg-green-500"
        }`}
      >
        <header className="flex items-center justify-between">
          {lessonAvailable ? (
            <span
              className={`flex items-center gap-2 text-sm  font-medium ${
                isActiveLesson ? "text-white" : "text-blue-500"
              }`}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span
              className={`flex items-center gap-2 text-sm  font-medium text-orange-500`}
            >
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={`text-xs rounded px-2 py-[0.125rem] text-white border  font-bold ${
              isActiveLesson ? "border-white" : "border-green-300"
            }`}
          >
            {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong
          className={`mt-5 block ${
            isActiveLesson ? `text-white` : "text-gray-200"
          }`}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}
