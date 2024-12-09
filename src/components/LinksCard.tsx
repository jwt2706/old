import { FC } from "react";
import { CardBody, CardContainer, CardItem } from "./Perspective";
import { FaGithub, FaEnvelope } from "react-icons/fa";

export const LinksCard: FC = () => {
  return (
    <CardContainer className="w-full sm:w-80 p-4 sm:p-6">
      <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-full sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem className="text-xl mb-2 font-bold mx-auto text-neutral-600 dark:text-white">
          Check out my projects, or contact me!
        </CardItem>

        <CardItem
          translateZ="75"
          className="flex flex-col sm:flex-row justify-center sm:justify-around items-center w-full mt-4"
        >
          <div className="flex flex-col items-center logo svg">
            <a
              href="https://github.com/jwt2706"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 p-4 flex flex-col items-center"
            >
              <FaGithub size={110} color="black" />
              <p className="mt-4 mb-2 underline-animation">
                github.com/jwt2706
              </p>
            </a>
          </div>
          <div className="flex flex-col items-center logo svg">
            <a
              href="mailto:work@jwt2706.ca"
              className="w-1/2 p-4 flex flex-col items-center"
            >
              <FaEnvelope size={110} color="black" />
              <p className="mt-4 mb-2 underline-animation">work@jwt2706.ca</p>
            </a>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
