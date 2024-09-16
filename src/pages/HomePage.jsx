import React from "react";
import NoteList from "../components/NoteList";
import NoteSearch from "../components/NoteSearch";
import Action from "../components/Action";
import Loading from "../components/Loading";
import LocaleContext from "../contexts/LocaleContext";
import { getActiveNotes } from "../utils/network-data";
import { useSearchParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { selectLanguage } = React.useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();
  function onAddButtonHandler() {
    navigate("/notes/new");
  }

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter(({ title }) => {
    return title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="homepage">
      <h2>{selectLanguage({ id: "Catatan Aktif", en: "Active Note" })}</h2>
      <NoteSearch keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
      <div className="homepage__action">
        <Action
          title={selectLanguage({ id: "Tambah", en: "Add" })}
          onClick={onAddButtonHandler}
          icon={<FiPlus />}
        />
      </div>
    </section>
  );
}
export default HomePage;
