function Container() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#006a61] text-[14px] text-center text-nowrap">
        <p className="leading-[21px] whitespace-pre">Tous les documents</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[8px] py-0 relative shrink-0" data-name="Margin">
      <Container />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#006a61] box-border content-center flex flex-wrap gap-0 h-[20px] items-center justify-center min-w-[20px] px-[6px] py-0 relative rounded-[10px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">
        <p className="leading-[12px] whitespace-pre">125</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Background />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Margin />
      <Container1 />
    </div>
  );
}

function Tab() {
  return (
    <div className="box-border content-stretch flex flex-col items-center justify-center max-w-[360px] min-h-[48px] min-w-[90px] overflow-clip px-[16px] py-[13.5px] relative shrink-0" data-name="Tab">
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)] text-center text-nowrap">
        <p className="leading-[21px] whitespace-pre">Dépôt HAL incomplet</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[8px] py-0 relative shrink-0" data-name="Margin">
      <Container3 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#de3730] box-border content-center flex flex-wrap gap-0 h-[20px] items-center justify-center min-w-[20px] px-[6px] py-0 relative rounded-[10px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">
        <p className="leading-[12px] whitespace-pre">104</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Background1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Margin1 />
      <Container4 />
    </div>
  );
}

function Tab1() {
  return (
    <div className="box-border content-stretch flex flex-col items-center justify-center max-w-[360px] min-h-[48px] min-w-[90px] overflow-clip px-[16px] py-[13.5px] relative shrink-0" data-name="Tab">
      <Container5 />
    </div>
  );
}

function TablistScrollableTabs() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Tablist - scrollable tabs">
      <Tab />
      <Tab1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-x-auto overflow-y-clip relative self-stretch shrink-0" data-name="Container">
      <TablistScrollableTabs />
      <div className="absolute bg-[#006a61] bottom-0 h-[4px] left-0 rounded-tl-[100px] rounded-tr-[100px] w-[204.5px]" data-name="Background" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-start justify-center min-h-[48px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container6 />
    </div>
  );
}

export default function HorizontalBorder() {
  return (
    <div className="relative size-full" data-name="HorizontalBorder">
      <div className="box-border content-stretch flex flex-col items-start pb-[0.8px] pt-0 px-0 relative size-full">
        <Container7 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dde4e1] border-[0px_0px_0.8px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}