"use client"
import React, { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";

export function CircularPagination() {
    const [active, setActive] = React.useState(1);
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams()
    const page = params.get("page")
    const perPage = params.get("per_page")

    const totalPages = useSelector((state: RootState) => state.users.totalPages);
    // previous button function
    useEffect(() => {
        if (page) {
            setActive(Number(page));
        }
    }, [page, params]);

    // next button function
    const next = (): void => {
        if (active === totalPages) return;
        router.push(pathname + `?page=${String(active + 1)}${perPage ? `&per_page=${perPage}` : ""}`)
        setActive(active + 1);
    };
    // previous button function
    const prev = (): void => {
        if (active === 1) return;
        router.push(pathname + `?page=${String(active - 1)}${perPage ? `&per_page=${perPage}` : ""}`)
        setActive(active - 1);
    };

    return (
        <>
            {totalPages >= 1 ? (
                <div className="flex items-center gap-4 justify-between mt-10">
                    <button
                        className="flex items-center gap-2 rounded-full"
                        onClick={prev}
                        disabled={active === 1}>
                        <FaArrowLeft />
                        Previous
                    </button>
                    <div className="flex items-center gap-2">
                        {Array(totalPages)
                            ?.fill(undefined)
                            .map((ite, key) => {
                                return (
                                    <button
                                        key={key}
                                        onClick={e => router.push(pathname + `?page=${key + 1}${perPage ? `&per_page=${perPage}` : ""}`)}
                                    >
                                        {key + 1}
                                    </button>
                                );
                            })}
                    </div>
                    <button
                        className="flex items-center gap-2 rounded-full"
                        onClick={next}
                        disabled={active === totalPages}>
                        Next
                        <FaArrowRight />
                    </button>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
