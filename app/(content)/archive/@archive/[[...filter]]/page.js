import NewsList from "@/components/news-list";
import {getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth} from "@/lib/news";
import Link from "next/link";
import {Suspense} from "react";

async function FilterHeader({year, month}) {
    const availableYears = await getAvailableNewsYears();
    let links = availableYears;

    // 지정하지 않은 path 및 slug가 들어올 때
    if (
        year &&
        !availableYears.includes(year) ||
        month &&
        !getAvailableNewsMonths(year).includes(month)
    ) {
        throw new Error('Invalid Error');
    }

    // 년도만 존재 할 때 ..
    if (year && !month) {
        // 년도에 해당하는 월 뽑아오기
        links = getAvailableNewsMonths(year);
    }

    // 둘다 존재 할 때..
    if (year && month) {
        links = [];
    }

    return (
        <header id="archive-header">
            <nav>
                <ul>
                    {links.map((link) => {
                        const href = year
                            ? `/archive/${year}/${link}`
                            : `/archive/${link}`;

                        return (
                            <li key={link}>
                                <Link href={href}>{link}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}
async function FilteredNews({year, month}) {
    let news;

    if (year && !month) {
        news = await getNewsForYear(year);
    } else if (year && month) {
        news = await getNewsForYearAndMonth(year, month);
    }

    let newsContent = <p>No news found for the selected period.</p>

    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />
    }

    return newsContent;

}

export default async function FilteredNewsPage({params}) {
    const filter = params.filter;
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];

    return (
        <>
            {/*<Suspense fallback={<p>Filter Loading news ..</p>}>*/}
            {/*    */}
            {/*</Suspense>*/}
            <Suspense fallback={<p>Loading news ..</p>}>
                <FilterHeader year={selectedYear} month={selectedMonth} />
                <FilteredNews year={selectedYear} month={selectedMonth} />
            </Suspense>
        </>
    );
}