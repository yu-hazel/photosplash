import { useMemo, useState } from "react"
import { useRecoilValueLoadable } from "recoil"
import { imageData } from "@/recoil/selectors/imageSelector"
import { CardDTO } from "./types/card"

import CommonHeader from "@components/common/header/CommonHeader"
import CommonSearchBar from "@components/common/searchBar/CommonSearchBar"
import CommonNav from "@components/common/navigation/CommonNav"
import CommonFooter from "@/components/common/footer/CommonFooter"
import Card from "./components/Card"
import DetailDialog from "@/components/common/dialog/DetailDialog"
import Loading from "./components/Loading"

// CSS
import styles from "./styles/index.module.scss"

function index() {
    const imgSelector = useRecoilValueLoadable(imageData)
    const [imgData, setImgData] = useState<CardDTO>()
    const [open, setOpen] = useState<boolean>(false) // 이미지 상세 다이얼로그 발생(관리) state

    const CARD_LIST = useMemo(() => {
        // imgSelector.state = hasValue or loading
        if (imgSelector.state === 'hasValue'){
            const result = imgSelector.contents.results.map((card: CardDTO) => {
                return <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData}/>
            })
            return result
        } else {
            return <Loading />
        }
    }, [imgSelector])

    return (
        <div className={styles.page}>
            {/*공통 헤더 UI 부분*/}
            <CommonHeader />
            {/* 공통 내비게이션 UI 부분 */}
            <CommonNav />
            <div className={styles.page__contents}>
                <div className={styles.page__contents__introBox}>
                    <div className={styles.wrapper}>
                        <span className={styles.wrapper__title}>PhotoSplash</span>
                        <span className={styles.wrapper__desc}>
                            리액트를 활용한 개인 포트폴리오입니다. <br />
                            Unsplash API를 사용하고 있습니다.
                        </span>
                        {/* 검색창 UI 부분 */}
                        <CommonSearchBar />
                    </div>
                </div>
                <div className={styles.page__contents__imageBox}>
                    {CARD_LIST}
                </div>
            </div>
            {/* 공통 푸터 UI 부분 */}
            <CommonFooter />
            {open && <DetailDialog data={imgData} handleDialog={setOpen} />}
        </div>
    )
}

export default index