/* eslint-disable @next/next/no-img-element */
"use client"
import { MobilePagination } from "@/components/MobilePagination";
import { CircularPagination } from "@/components/Pagination";
import { RootState } from "@/redux/reducers";
import { userFetchRequest } from "@/redux/users/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const users: Array<any> = useSelector((state: RootState) => state.users.data);
  const perPage = useSelector((state: RootState) => state.users.count);
  const loading: boolean = useSelector((state: RootState) => state.users.loading);
  const params = useSearchParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    const page = params.get("page")
    const perPage = params.get("per_page")
    const qs = {
      page,
      "per_page": perPage,
    }
    dispatch(userFetchRequest(qs))
  }, [dispatch, params])
  return (
    <div className="p-10 bg-white  rounded-[.95rem] shadow-md">
      {
        !loading && <div className="max-w-full overflow-x-auto h-[calc(100vh-35vh)] custom-overflow overflow-y-auto rounded-[.95rem]">
          <div className="flex-auto block py-8 pt-6 px-9">
            <div className="overflow-x-auto">
              <table className="w-full my-0 align-middle text-dark border-neutral-200">
                <thead className="align-bottom">
                  <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                    <th className="pb-3 text-start min-w-[175px]">First Name</th>
                    <th className="pb-3 text-start min-w-[100px]">Last Name</th>
                    <th className="pb-3 pr-12 text-start min-w-[175px]">Email</th>
                    <th className="pb-3 pr-12 text-end min-w-[175px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((e) => {
                      return (
                        <tr key={e.id} className="border-b border-dashed last:border-b-0">
                          <td className="p-3 pl-0">
                            <div className="flex items-center">
                              <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                <img src={e.avatar} className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                              </div>
                              <div className="flex flex-col justify-start">
                                <a href="javascript:void(0)" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">{e.first_name}</a>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 pr-0 text-start">
                            <span className="font-semibold text-light-inverse text-md/normal">{e.last_name}</span>
                          </td>
                          <td className="p-3 pr-0 text-start">
                            <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                              {e.email}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <button onClick={s => router.push("/user/" + e.id)} className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center">
                              <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                              </span>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
      {
        loading && <div className="flex  h-[calc(100vh-35vh)] items-center justify-center bg-gray-100">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-black border-t-transparent"></div>
        </div>
      }
      <div className="block">
        <CircularPagination />
      </div >
      <br />
      {!loading && (<div className="flex justify-center place-items-center gap-x-5">
        <label htmlFor="select">
          result per page
        </label>
        <select name="" id="" className="p-2 rounded-lg" value={perPage} onChange={e => router.push(path + `?page=1&per_page=${e.target.value}`)}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>)
      }
    </div >
  )
}
