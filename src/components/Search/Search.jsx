import {useNavigate} from "react-router-dom";


export default function Search() {
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const formDate = new FormData(event.currentTarget);
        if (!formDate.get("title")) {
            return;
        }
        navigate(`/search?title=${formDate.get("title")}`);

    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Movie title:
                    <input placeholder={"Search movie"} name={"title"} />
                </label>
                <button type={"submit"}>Search</button>
            </form>
        </>

    );
}
