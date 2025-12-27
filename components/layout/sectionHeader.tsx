interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtext: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtext }) => {
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:gap-0 items-start justify-between w-full">
      <h2 className="flex-center gap-3 w-fit text-base 2xlg:text-lg font-semibold text-neutral-text">
        {title}
        <div className="w-[clamp(96px,15vw,200px)] h-0.5 md:h-[2.3px] lg:h-[2.5px] bg-primary" />
      </h2>

      <p className="text-sm 2xlg:text-base text-left xl:text-right text-neutral-7 w-full xl:max-w-122.5 lg:max-w-137.5">
        {subtext}
      </p>
    </div>
  );
};

export default SectionHeader;
