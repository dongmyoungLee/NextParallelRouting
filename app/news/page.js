import NewsList from "@/components/news-list";
import {DUMMY_NEWS} from "@/dummy-news";

export default function NewsPage() {
    return (
        <>
            <h1>news</h1>
            <NewsList news={DUMMY_NEWS} />
        </>

    );
}