"use client"
import React, { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";

export function MobilePagination({ circleCount, count }: any) {
    const [active, setActive] = React.useState(1);
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams()
    const page = params.get("page")
    const perPage = params.get("per_page")
    const totalPages = useSelector((state: RootState) => state.users.totalPages);

    useEffect(() => {
        if (page) {
            setActive(Number(page));
        }
    }, [page, router]);

    const getItemProps = (index: React.SetStateAction<number>) => ({
        className: active === index ? "bg-boxdark-2 text-white border-none" : "",
        onClick: () => {
            router.push(pathname + `?page=${page}&per_page=${perPage}`);
            setActive(index);
        },
    });

    const next = () => {
        if (active === circleCount) return;
        router.push(pathname + `?page=${String(active + 1)}`)
        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        router.push(pathname + `?page=${String(active - 1)}`)
        setActive(active - 1);
    };

    return (
        <>
            {
                totalPages >= 1 && (
                    <div className="w-full flex justify-center place-items-center py-5">
                        <button
                            className="bg-white rounded-xl text-boxdark-2"
                        >
                            <span onClick={prev} >
                                <FaArrowLeft className="h-4 w-4" />
                            </span>
                            {Array(totalPages)
                                ?.fill(undefined)
                                .map((ite, key) => {
                                    return (
                                        <span
                                            key={key}
                                            {...getItemProps(key + 1)}                    >
                                            {key + 1}
                                        </span>
                                    );
                                })}
                            <span onClick={next} >
                                <FaArrowRight className="h-4 w-4" />
                            </span>
                        </button>
                    </div>
                )
            }
        </>
    );
}
