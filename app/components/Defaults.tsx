"use client";

import useTimeStorage from "@/hooks/useTimerStorage";
import { ITimer } from "@/interfaces/ISotrage";
import { useEffect, useState } from "react";
import s from "@/styles/defaults.module.scss";
import Link from "next/link";
import { joinClasses } from "@/utils/joinClasses";

const Defautls = () => {
  const { getStorage } = useTimeStorage();
  const [defs, setDefs] = useState<ITimer>({productive: 0, rest: 0})

  useEffect(() => {
    setDefs(getStorage().defaults)
  }, [])

  return (
    <>
      <div className={joinClasses(s.defs)}>
        <div className={s.defs__title}>Defaults \</div>
        <h1 className={s.defs__prop}>
          productive - <span>{defs.productive / 60}m</span>
        </h1>
        <h1 className={s.defs__prop}>
          rest - <span>{defs.rest / 60}m</span>
        </h1>
        <Link
          href={"/configuration"}
          className={s.defs__conf}
          style={{ backgroundImage: "url(./icons/configuration.svg)" }}
        ></Link>
      </div>
    </>
  );
};

export default Defautls;
