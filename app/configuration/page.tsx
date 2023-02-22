"use client";

import useInput from "@/hooks/useInput";
import useTimeStorage from "@/hooks/useTimerStorage";
import { joinClasses } from "@/utils/joinClasses";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import s from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  toggler: () => void;
}

const Configuration = ({ toggler }: PageProps) => {
  const productive = useInput("1");
  const rest = useInput("1");
  const timer = useTimeStorage();
  const router = useRouter();

  const buttonHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (productive.value && rest.value) {
      timer.initStorage({
        productive: Number(productive.value),
        rest: Number(rest.value),
      });
      router.push("/");
    }
  };

  return (
    <>
      <div className={joinClasses("wrapper")}>
        <div className={joinClasses("fs")}>
          <div className={s.settings}>
            <div className={joinClasses("container", s.settings__body)}>
              <Link href="/" className={s.settings__home}>
                <Image
                  className={s.settings__img}
                  src="/icons/arrow.svg"
                  width={0}
                  height={0}
                  alt="arrow svg"
                />{" "}
                Home
              </Link>
              <h1 className={s.settings__title}>Configurations</h1>
              <form
                onSubmit={buttonHandler}
                className={joinClasses(s.settings__form, s.form)}
              >
                <p className={s.form__subtitle}>PRODUCTIVE</p>
                <div className={joinClasses(s.form__field, s.field)}>
                  <input
                    type="number"
                    {...productive.bind}
                    className={s.field__input}
                  />
                  <div className={s.field__btn} onClick={productive.increase}>
                    <div>+</div>
                  </div>
                  <div className={s.field__btn} onClick={productive.decrease}>
                    <div>-</div>
                  </div>
                </div>
                <p className={s.form__subtitle}>REST</p>
                <div className={joinClasses(s.form__field, s.field)}>
                  <input
                    type="number"
                    {...rest.bind}
                    className={s.field__input}
                  />
                  <div className={s.field__btn} onClick={rest.increase}>
                    <div>+</div>
                  </div>
                  <div className={s.field__btn} onClick={rest.decrease}>
                    <div>-</div>
                  </div>
                </div>
                <button className={s.form__submit}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configuration;
