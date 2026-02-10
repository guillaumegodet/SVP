import svgPaths from "./svg-2hiwlpu7z8";
import imgImage22 from "figma:asset/0cb7103460abf945778a92dcb22acf2e89658bc1.png";
import imgImage1 from "figma:asset/39da45ffcf8928caa2dffb4fb0e884582cf65f6f.png";
import imgImage29 from "figma:asset/c84271b3b626cfe0134a518765d10c9495166976.png";
import imgImage30 from "figma:asset/54ccf8e71c78a2a53f125d2f7addc32e519c05de.png";
import imgImage31 from "figma:asset/ede84f9e7df7f441032cd4f67a718fdd62131d3b.png";
import imgImage32 from "figma:asset/8c074fea4b0950e13d8d8040302f46862b63a469.png";
import imgOrcid24X241 from "figma:asset/6e3dbbc34225b24e434ec4a2f2b823e2d5f2a95c.png";
import imgImage33 from "figma:asset/83c4b965ab7a78086f93750808265ab704388929.png";
import imgHal from "figma:asset/da60111133ce4fee28bc0ac92f48f081549aa44e.png";
import imgIdref from "figma:asset/834dc63c7f6fca9ae8d639d93da14de67568ef11.png";
import imgRectangle1896 from "figma:asset/d1e1a41a731208c6e807fd34e1463c47b3f79399.png";
import imgRectangle12303 from "figma:asset/e50eef2f18f86630de34d5619f2e59c1b773f96a.png";
import imgAvatar from "figma:asset/72f71c481924a99473c91bfdac585c9cc9c2bc58.png";

function Indicator() {
  return (
    <div className="absolute bottom-0 h-[14px] left-0 right-0" data-name="Indicator">
      <div className="absolute bg-[#006a61] bottom-0 h-[3px] left-[2px] right-[2px] rounded-tl-[100px] rounded-tr-[100px]" data-name="Shape" />
    </div>
  );
}

function TabContents() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-[4px] grow items-center justify-center min-h-px min-w-px overflow-clip px-0 py-[14px] relative shrink-0" data-name="Tab Contents">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#006a61] text-[14px] text-center text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Synthèse</p>
      </div>
      <Indicator />
    </div>
  );
}

function StateLayer() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-end min-h-px min-w-px overflow-clip relative shrink-0 w-full" data-name="State-layer">
      <TabContents />
    </div>
  );
}

function Tab() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start overflow-clip relative shrink-0" data-name="Tab 1">
      <StateLayer />
    </div>
  );
}

function TabContents1() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-[4px] grow items-center justify-center min-h-px min-w-px overflow-clip px-0 py-[14px] relative shrink-0" data-name="Tab Contents">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3f4947] text-[14px] text-center text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Science ouverte</p>
      </div>
    </div>
  );
}

function StateLayer1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="State-layer">
      <div className="flex flex-col items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-end px-[16px] py-0 relative size-full">
          <TabContents1 />
        </div>
      </div>
    </div>
  );
}

function Tab1() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start overflow-clip relative shrink-0" data-name="Tab 2">
      <StateLayer1 />
    </div>
  );
}

function TabContents2() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-[4px] grow items-center justify-center min-h-px min-w-px overflow-clip px-0 py-[14px] relative shrink-0" data-name="Tab Contents">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3f4947] text-[14px] text-center text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Expertises</p>
      </div>
    </div>
  );
}

function StateLayer2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="State-layer">
      <div className="flex flex-col items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-end px-[16px] py-0 relative size-full">
          <TabContents2 />
        </div>
      </div>
    </div>
  );
}

function Tab2() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start overflow-clip relative shrink-0" data-name="Tab 3">
      <StateLayer2 />
    </div>
  );
}

function TabContents3() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-[4px] grow items-center justify-center min-h-px min-w-px overflow-clip px-0 py-[14px] relative shrink-0" data-name="Tab Contents">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3f4947] text-[14px] text-center text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Réseau</p>
      </div>
    </div>
  );
}

function StateLayer3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="State-layer">
      <div className="flex flex-col items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-end px-[16px] py-0 relative size-full">
          <TabContents3 />
        </div>
      </div>
    </div>
  );
}

function Tab3() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start overflow-clip relative shrink-0" data-name="Tab 4">
      <StateLayer3 />
    </div>
  );
}

function TabContents4() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-[4px] grow items-center justify-center min-h-px min-w-px overflow-clip px-0 py-[14px] relative shrink-0" data-name="Tab Contents">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3f4947] text-[14px] text-center text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">Profils similaires</p>
      </div>
    </div>
  );
}

function StateLayer4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="State-layer">
      <div className="flex flex-col items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-end px-[16px] py-0 relative size-full">
          <TabContents4 />
        </div>
      </div>
    </div>
  );
}

function Tab4() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start overflow-clip relative shrink-0" data-name="Tab 5">
      <StateLayer4 />
    </div>
  );
}

function TabGroup() {
  return (
    <div className="relative shrink-0 w-full" data-name="Tab group">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start px-[32px] py-0 relative w-full">
          <Tab />
          <Tab1 />
          <Tab2 />
          <Tab3 />
          <Tab4 />
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <div className="absolute bottom-[-0.01%] left-0 right-0 top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1160 1">
          <g id="Divider">
            <line id="Divider_2" stroke="var(--stroke-0, #DDE4E1)" x1="4.37114e-08" x2="1160" y1="0.500101" y2="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Tabs() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[280px] top-[88px] w-[1160px]" data-name="Tabs">
      <TabGroup />
      <Divider />
    </div>
  );
}

function Filter() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="filter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="filter">
          <path d={svgPaths.p39cb0e00} fill="var(--fill-0, #6941C6)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Down() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="down">
          <path d="M5 6.5L8 9.5L11 6.5" id="icon" stroke="var(--stroke-0, #6941C6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-bl-[6px] rounded-tl-[6px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(70,79,96,0.16)] shrink-0" data-name="Dropdown">
      <Filter />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] text-nowrap tracking-[0.28px] whitespace-pre">Pays</p>
      <Down />
    </div>
  );
}

function Shortcut() {
  return (
    <div className="absolute right-[12px] size-[16px] top-[8px]" data-name="shortcut">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="shortcut">
          <rect fill="var(--fill-0, #E9EDF5)" height="16" rx="4" width="16" />
          <path d={svgPaths.p34d7b900} fill="var(--fill-0, #868FA0)" id="/" />
        </g>
      </svg>
    </div>
  );
}

function Search() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[8px]" data-name="Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Search">
          <path clipRule="evenodd" d={svgPaths.p17546400} fill="var(--fill-0, #868FA0)" fillRule="evenodd" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[32px] overflow-clip relative rounded-br-[6px] rounded-tr-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06),0px_0px_0px_1px_rgba(134,143,160,0.16)] shrink-0 w-[280px]" data-name="Input">
      <Shortcut />
      <Search />
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[36px] not-italic right-[36px] text-[#a1a9b8] text-[14px] top-[16px] translate-y-[-50%]">
        <p className="leading-[20px]">Rechercher</p>
      </div>
    </div>
  );
}

function Filtrer() {
  return (
    <div className="absolute content-stretch flex gap-px items-start left-[12px] top-[94px]" data-name="Filtrer">
      <Dropdown />
      <Input />
    </div>
  );
}

function BuildingBlocksCardStatesElevated() {
  return (
    <div className="absolute bg-white border border-[#bec9c6] border-solid h-[391px] left-[878px] overflow-clip rounded-[8px] top-[960px] w-[540px]" data-name="Building blocks/Card states/Elevated">
      <div className="absolute h-0 left-[-1px] top-[70px] w-[539px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 539 1">
            <path d="M0 0.5H539" id="Vector 2137" stroke="var(--stroke-0, #BEC9C6)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[normal] left-[23px] text-[#006a61] text-[20px] text-nowrap top-[23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Collaborations internationales
      </p>
      <div className="absolute h-[214px] left-[23px] top-[120px] w-[489px]" data-name="image 12" />
      <div className="absolute h-[224px] left-[6px] top-[146px] w-[509px]" data-name="image 22">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage22} />
      </div>
      <Filtrer />
    </div>
  );
}

function StateLayer5() {
  return <div className="absolute inset-[-1px]" data-name="State-layer" />;
}

function BuildingBlocksCardStatesElevated1() {
  return (
    <div className="absolute bg-white border border-[#bec9c6] border-solid h-[391px] left-[312px] overflow-clip rounded-[8px] top-[960px] w-[540px]" data-name="Building blocks/Card states/Elevated">
      <div className="absolute h-[282px] left-[35px] top-[88px] w-[427px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <StateLayer5 />
      <div className="absolute inset-[calc(18.16%-1px)_calc(0.19%-1px)_calc(81.84%-1px)_-1px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 539 1">
            <path d="M0 0.5H539" id="Vector 2137" stroke="var(--stroke-0, #BEC9C6)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[normal] left-[23px] text-[#006a61] text-[20px] text-nowrap top-[22px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Taux d'accès ouvert des publications scientifiques`}</p>
    </div>
  );
}

function BuildingBlocksCardStatesElevated2() {
  return (
    <div className="absolute bg-white border border-[#bec9c6] border-solid h-[664px] left-[796px] overflow-clip rounded-[8px] top-[1371px] w-[622px]" data-name="Building blocks/Card states/Elevated">
      <div className="absolute h-0 left-[-1px] right-[calc(0.19%-1px)] top-[70px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 621 1">
            <path d="M0 0.5H620.848" id="Vector 2137" stroke="var(--stroke-0, #BEC9C6)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[normal] left-[23px] text-[#006a61] text-[20px] text-nowrap top-[23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Domaines de recherche
      </p>
      <div className="absolute h-[560px] left-[47px] top-[82px] w-[542px]" data-name="image 29">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage29} />
      </div>
    </div>
  );
}

function BuildingBlocksCardStatesElevated3() {
  return (
    <div className="absolute bg-white border border-[#bec9c6] border-solid h-[517px] left-[312px] overflow-clip rounded-[8px] top-[1383px] w-[437px]" data-name="Building blocks/Card states/Elevated">
      <div className="absolute h-0 left-[-1px] right-[calc(0.19%-1px)] top-[70px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 437 1">
            <path d="M0 0.5H436.191" id="Vector 2137" stroke="var(--stroke-0, #BEC9C6)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[normal] left-[23px] text-[#006a61] text-[20px] text-nowrap top-[23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Principaux co-auteurs
      </p>
      <div className="absolute h-[298px] left-[58px] top-[129px] w-[345px]" data-name="image 30">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage30} />
      </div>
    </div>
  );
}

function BuildingBlocksCardStatesElevated4() {
  return (
    <div className="absolute bg-white border border-[#bec9c6] border-solid h-[341px] left-[977px] overflow-clip rounded-[8px] top-[555px] w-[437px]" data-name="Building blocks/Card states/Elevated">
      <div className="absolute h-0 left-[-1px] right-[calc(0.19%-1px)] top-[70px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 437 1">
            <path d="M0 0.5H436.191" id="Vector 2137" stroke="var(--stroke-0, #BEC9C6)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[normal] left-[23px] text-[#006a61] text-[20px] text-nowrap top-[23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Expertises
      </p>
      <div className="absolute h-[248px] left-[70px] top-[80px] w-[289px]" data-name="image 31">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage31} />
      </div>
    </div>
  );
}

function BuildingBlocksCardStatesElevated5() {
  return (
    <div className="absolute bg-white border border-[#bec9c6] border-solid h-[341px] left-[317px] overflow-clip rounded-[8px] top-[555px] w-[643px]" data-name="Building blocks/Card states/Elevated">
      <div className="absolute h-0 left-[-1px] right-[calc(0.19%-1px)] top-[70px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 642 1">
            <path d="M0 0.5H641.809" id="Vector 2137" stroke="var(--stroke-0, #BEC9C6)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[normal] left-[23px] text-[#006a61] text-[20px] text-nowrap top-[23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Projets en cours
      </p>
      <div className="absolute h-[152px] left-[23px] top-[122px] w-[563px]" data-name="image 32">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage32} />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[2%_1.03%_14%_13.4%]" data-name="Group">
      <div className="absolute bottom-[-0.24%] left-0 right-0 top-[-0.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 415 211">
          <g id="Group">
            <path d="M0 210.5H415" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0 158H415" id="Vector_2" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0 105.5H415" id="Vector_3" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0 53H415" id="Vector_4" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0 0.5H415" id="Vector_5" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[2%_1.03%_14%_13.4%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.12%] right-[-0.12%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 416 210">
          <g id="Group">
            <path d="M26.4375 0V210" id="Vector" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M78.3125 0V210" id="Vector_2" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M130.188 0V210" id="Vector_3" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M182.062 0V210" id="Vector_4" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M233.938 0V210" id="Vector_5" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M285.812 0V210" id="Vector_6" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M337.688 0V210" id="Vector_7" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M389.562 0V210" id="Vector_8" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M0.5 0V210" id="Vector_9" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
            <path d="M415.5 0V210" id="Vector_10" stroke="var(--stroke-0, #E5E7EB)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[2%_1.03%_14%_13.4%]" data-name="Group">
      <Group />
      <Group1 />
    </div>
  );
}

function RechartsZindex100R() {
  return (
    <div className="absolute contents inset-[2%_1.03%_14%_13.4%]" data-name="recharts-zindex--100-:r9:">
      <Group2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[65%_44.99%_14%_46.56%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 53">
        <g id="Group">
          <path d={svgPaths.p2c873d00} fill="var(--fill-0, #8B5CF6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[54.5%_34.29%_14%_57.26%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 79">
        <g id="Group">
          <path d={svgPaths.p3a8abbf0} fill="var(--fill-0, #8B5CF6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[54.5%_23.6%_14%_67.95%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 79">
        <g id="Group">
          <path d={svgPaths.p3a8abbf0} fill="var(--fill-0, #8B5CF6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[44%_12.9%_14%_78.65%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 105">
        <g id="Group">
          <path d={svgPaths.p22e81af0} fill="var(--fill-0, #8B5CF6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[33.5%_2.2%_14%_89.34%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 132">
        <g id="Group">
          <path d={svgPaths.p1650f900} fill="var(--fill-0, #8B5CF6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[33.5%_2.2%_14%_46.56%]" data-name="Group">
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[33.5%_2.2%_14%_46.56%]" data-name="Group">
      <Group8 />
    </div>
  );
}

function RechartsBarRb() {
  return (
    <div className="absolute contents inset-[33.5%_2.2%_14%_46.56%]" data-name="recharts-bar-:rb:">
      <Group9 />
    </div>
  );
}

function RechartsZindex300Re() {
  return (
    <div className="absolute contents inset-[33.5%_2.2%_14%_46.56%]" data-name="recharts-zindex-300-:re:">
      <RechartsBarRb />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[86%_81.25%_11.6%_18.75%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute inset-[86%_70.55%_11.6%_29.45%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute inset-[86%_59.86%_11.6%_40.14%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute inset-[86%_49.16%_11.6%_50.84%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute inset-[86%_38.47%_11.6%_61.53%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute inset-[86%_27.77%_11.6%_72.23%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute inset-[86%_17.07%_11.6%_82.93%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute inset-[86%_6.38%_11.6%_93.62%]" data-name="Group">
      <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 6">
          <g id="Group">
            <path d="M0.5 6V0" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[86%_6.38%_11.6%_18.75%]" data-name="Group">
      <Group10 />
      <Group11 />
      <Group12 />
      <Group13 />
      <Group14 />
      <Group15 />
      <Group16 />
      <Group17 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[86%_6.38%_11.6%_18.75%]" data-name="Group">
      <Group18 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[86%_1.03%_11.6%_13.4%]" data-name="Group">
      <div className="absolute inset-[86%_1.03%_14%_13.4%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 415 1">
            <path d="M0 0.5H415" id="Vector" stroke="var(--stroke-0, #E5E7EB)" />
          </svg>
        </div>
      </div>
      <Group19 />
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute inset-[86%_86.6%_14%_12.16%]" data-name="Group">
      <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute inset-[65%_86.6%_35%_12.16%]" data-name="Group">
      <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute inset-[44%_86.6%_56%_12.16%]" data-name="Group">
      <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute inset-[23%_86.6%_77%_12.16%]" data-name="Group">
      <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute inset-[2%_86.6%_98%_12.16%]" data-name="Group">
      <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
          <g id="Group">
            <path d="M0 0.5H6" id="Vector" stroke="var(--stroke-0, #666666)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[2%_86.6%_14%_12.16%]" data-name="Group">
      <Group21 />
      <Group22 />
      <Group23 />
      <Group24 />
      <Group25 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[2%_86.6%_14%_12.16%]" data-name="Group">
      <Group26 />
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[2%_86.6%_14%_12.16%]" data-name="Group">
      <div className="absolute inset-[2%_86.6%_14%_13.4%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 210">
            <path d="M0.5 0V210" id="Vector" stroke="var(--stroke-0, #E5E7EB)" />
          </svg>
        </div>
      </div>
      <Group27 />
    </div>
  );
}

function RechartsZindex500Rg() {
  return (
    <div className="absolute contents inset-[2%_1.03%_11.6%_12.16%]" data-name="recharts-zindex-500-:rg:">
      <Group20 />
      <Group28 />
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[87.81%_78.16%_6.19%_15.66%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_78.16%_6.19%_15.66%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-center text-nowrap whitespace-pre">2006</p>
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[87.81%_67.46%_6.19%_26.35%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_67.46%_6.19%_26.35%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-center text-nowrap whitespace-pre">2008</p>
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[87.81%_56.97%_6.19%_37.26%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_56.97%_6.19%_37.26%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-center text-nowrap whitespace-pre">2010</p>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents inset-[87.81%_46.28%_6.19%_47.95%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_46.28%_6.19%_47.95%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-center text-nowrap whitespace-pre">2012</p>
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[87.81%_35.48%_6.19%_58.54%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_35.48%_6.19%_58.54%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-center text-nowrap whitespace-pre">2014</p>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[87.81%_24.88%_6.19%_69.34%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_24.88%_6.19%_69.34%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-center text-nowrap whitespace-pre">2016</p>
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[87.81%_14.19%_6.19%_80.04%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_14.19%_6.19%_80.04%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-center text-nowrap whitespace-pre">2018</p>
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[87.81%_3.29%_6.19%_90.53%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[87.81%_3.29%_6.19%_90.53%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-center text-nowrap whitespace-pre">2020</p>
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents inset-[87.81%_3.29%_6.19%_15.66%]" data-name="Group">
      <Group29 />
      <Group30 />
      <Group31 />
      <Group32 />
      <Group33 />
      <Group34 />
      <Group35 />
      <Group36 />
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents inset-[82.9%_88.25%_11.1%_10.1%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[82.9%_88.25%_11.1%_10.1%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-nowrap text-right whitespace-pre">0</p>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[61.9%_88.25%_32.1%_10.1%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[61.9%_88.25%_32.1%_10.1%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-nowrap text-right whitespace-pre">2</p>
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents inset-[40.9%_88.25%_53.1%_10.1%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[40.9%_88.25%_53.1%_10.1%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-nowrap text-right whitespace-pre">4</p>
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[19.9%_88.25%_74.1%_10.1%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[19.9%_88.25%_74.1%_10.1%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-nowrap text-right whitespace-pre">6</p>
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute contents inset-[0.5%_88.25%_93.5%_10.1%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0.5%_88.25%_93.5%_10.1%] leading-[normal] not-italic text-[#6f7977] text-[12px] text-nowrap text-right whitespace-pre">8</p>
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute contents inset-[0.5%_88.25%_11.1%_10.1%]" data-name="Group">
      <Group38 />
      <Group39 />
      <Group40 />
      <Group41 />
      <Group42 />
    </div>
  );
}

function RechartsZindex2000Rl() {
  return (
    <div className="absolute contents inset-[0.5%_3.29%_6.19%_10.1%]" data-name="recharts-zindex-2000-:rl:">
      <Group37 />
      <Group43 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute h-[250px] left-0 overflow-clip top-0 w-[485px]" data-name="Icon">
      <RechartsZindex100R />
      <RechartsZindex300Re />
      <RechartsZindex500Rg />
      <RechartsZindex2000Rl />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[250px] left-[44px] top-[94px] w-[485px]" data-name="Container">
      <Icon />
    </div>
  );
}

function BuildingBlocksCardStatesElevated6() {
  return (
    <div className="absolute bg-white border border-[#bec9c6] border-solid h-[352px] left-[720px] overflow-clip rounded-[8px] top-[173px] w-[643px]" data-name="Building blocks/Card states/Elevated">
      <div className="absolute h-0 left-[-1px] right-[calc(0.19%-1px)] top-[70px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 642 1">
            <path d="M0 0.5H641.809" id="Vector 2137" stroke="var(--stroke-0, #BEC9C6)" />
          </svg>
        </div>
      </div>
      <Container />
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[normal] left-[23px] text-[#006a61] text-[20px] text-nowrap top-[23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Nombre de publications par an
      </p>
    </div>
  );
}

function Orcid24X() {
  return (
    <div className="absolute h-[27.174px] left-[447.43px] top-[461.59px] w-[29.283px]" data-name="orcid_24x24 1">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgOrcid24X241} />
    </div>
  );
}

function NameAndRole() {
  return (
    <div className="content-stretch flex flex-col font-['Roboto:Medium',sans-serif] font-medium items-center relative shrink-0 w-full" data-name="Name and role">
      <p className="leading-[24px] relative shrink-0 text-[#006a61] text-[16px] tracking-[0.15px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Olivia Dupont
      </p>
      <p className="leading-[20px] relative shrink-0 text-[#00201d] text-[14px] tracking-[0.1px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        LS2N
      </p>
    </div>
  );
}

function NameAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 text-center w-full" data-name="Name and supporting text">
      <NameAndRole />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full">Maitre de conférence, Nantes Université</p>
    </div>
  );
}

function SocialIcons() {
  return <div className="content-stretch flex gap-[16px] items-center justify-center shrink-0 w-full" data-name="Social icons" />;
}

function TextAndSocialLinks() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="Text and social links">
      <NameAndSupportingText />
      <SocialIcons />
    </div>
  );
}

function TeamMember() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[267.213px] items-center left-[335.18px] top-[219.29px] w-[341.635px]" data-name="_Team member">
      <div className="h-[72px] relative shrink-0 w-[64px]" data-name="image 33">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage33} />
      </div>
      <TextAndSocialLinks />
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute contents left-[312px] top-[174px]">
      <div className="absolute bg-white border border-[#bec9c6] border-solid h-[351px] left-[312px] rounded-[12px] top-[174px] w-[388px]" />
      <div className="absolute left-[491.89px] size-[28.209px] top-[461.08px]" data-name="hal">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgHal} />
      </div>
      <div className="absolute left-[534.6px] size-[28.209px] top-[461.08px]" data-name="idref">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgIdref} />
      </div>
      <Orcid24X />
      <TeamMember />
    </div>
  );
}

function AiScienceSparkAtomScientificExperimentArtificialIntelligenceAi() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[32px]" data-name="ai-science-spark--atom-scientific-experiment-artificial-intelligence-ai">
      <div className="absolute inset-[-3.12%_-3.12%_-3.13%_-3.12%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
          <g id="ai-science-spark--atom-scientific-experiment-artificial-intelligence-ai">
            <path d={svgPaths.p24b21500} id="Ellipse 967" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1812ca00} id="Ellipse 968" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pb6cb500} id="Ellipse 969" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1368e00} id="Vector 2136" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[2.56%] place-items-start relative" data-name="logo">
      <AiScienceSparkAtomScientificExperimentArtificialIntelligenceAi />
    </div>
  );
}

function Group44() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[16.74%] mt-0 place-items-start relative">
      <p className="[grid-area:1_/_1] font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 not-italic relative text-[#006a61] text-[0px] text-[32px] text-nowrap text-white whitespace-pre">
        <span className="font-['Inter:Light',sans-serif] font-light">So</span>
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold">Visu</span>
      </p>
      <div className="[grid-area:1_/_1] ml-[110px] mt-[14px] relative size-[16px]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path d={svgPaths.pe4f5d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[215px] mt-[9px] place-items-start relative" data-name="Mask group">
      <div className="[grid-area:1_/_1] bg-[#9ef2e6] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1px_-2px] mask-size-[24px_24px] ml-px mt-[2px] size-[21px]" style={{ maskImage: `url('${imgRectangle1896}')` }} />
    </div>
  );
}

function Logo1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Logo">
      <Logo />
      <Group44 />
      <MaskGroup />
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start pl-[24px] pr-[20px] py-0 relative w-full">
          <Logo1 />
        </div>
      </div>
    </div>
  );
}

function SearchLg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="search-lg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="search-lg">
          <path d={svgPaths.p22fdb270} id="Icon" stroke="var(--stroke-0, #006A61)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <SearchLg />
      <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#006a61] text-[16px] text-nowrap">Chercher</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">
          <Content />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input1 />
    </div>
  );
}

function InputDropdown() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input dropdown">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start px-[16px] py-0 relative w-full">
          <InputWithLabel />
        </div>
      </div>
    </div>
  );
}

function LeadingElement() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Leading element">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d={svgPaths.p1fba1600} id="Icon" stroke="var(--stroke-0, #00201D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <LeadingElement />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#00201d] text-[16px] text-nowrap whitespace-pre">Tableau de bord</p>
    </div>
  );
}

function NavItemBase() {
  return (
    <div className="bg-[#9ef2e6] box-border content-stretch flex gap-[8px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="_Nav item base">
      <Content1 />
    </div>
  );
}

function LeadingElement1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Leading element">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icons/publis">
          <path d={svgPaths.p24e90a00} id="Icon" stroke="var(--stroke-0, #9EF2E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <LeadingElement1 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#9ef2e6] text-[16px] text-nowrap whitespace-pre">Publications</p>
    </div>
  );
}

function NavItemBase1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="_Nav item base">
      <Content2 />
    </div>
  );
}

function LeadingElement2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Leading element">
      <div className="absolute inset-[-4.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
          <g id="icon">
            <path d={svgPaths.p1aec5570} id="Icons/expertises" stroke="var(--stroke-0, #9EF2E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <LeadingElement2 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#9ef2e6] text-[16px] text-nowrap whitespace-pre">Expertises</p>
    </div>
  );
}

function NavItemBase2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="_Nav item base">
      <Content3 />
    </div>
  );
}

function LeadingElement3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Leading element">
      <div className="absolute bg-[#9ef2e6] bottom-0 left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[24px_24px] right-[8.33%] top-0" style={{ maskImage: `url('${imgRectangle12303}')` }} />
    </div>
  );
}

function Content4() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <LeadingElement3 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#9ef2e6] text-[16px] text-nowrap whitespace-pre">Activités de recherche</p>
    </div>
  );
}

function NavItemBase3() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="_Nav item base">
      <Content4 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="relative shrink-0 w-full" data-name="Navigation">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-0 relative w-full">
          <NavItemBase />
          <NavItemBase1 />
          <NavItemBase2 />
          <NavItemBase3 />
          <div className="shrink-0 size-[24px]" data-name="Training" />
        </div>
      </div>
    </div>
  );
}

function Navigation1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[40px] items-start pb-0 pt-[32px] px-0 relative shrink-0 w-full" data-name="Navigation">
      <Header />
      <InputDropdown />
      <Navigation />
    </div>
  );
}

function LeadingElement4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Leading element">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d={svgPaths.p3dbade00} id="Vector" stroke="var(--stroke-0, #9EF2E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Content5() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <LeadingElement4 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#9ef2e6] text-[16px] text-nowrap whitespace-pre">Mes groupes</p>
    </div>
  );
}

function NavItemBase4() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="_Nav item base">
      <Content5 />
    </div>
  );
}

function LeadingElement5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Leading element">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icons/institutions">
          <path d={svgPaths.p11cb09f0} id="Icon" stroke="var(--stroke-0, #9EF2E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Content6() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <LeadingElement5 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#9ef2e6] text-[16px] text-nowrap whitespace-pre">Institutions</p>
    </div>
  );
}

function NavItemBase5() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="_Nav item base">
      <Content6 />
    </div>
  );
}

function LeadingElement6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Leading element">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icons/structures">
          <g id="Icon">
            <path d={svgPaths.p3cccb600} stroke="var(--stroke-0, #9EF2E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pf152080} stroke="var(--stroke-0, #9EF2E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Content7() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <LeadingElement6 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#9ef2e6] text-[16px] text-nowrap whitespace-pre">Laboratoires</p>
    </div>
  );
}

function NavItemBase6() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[248px]" data-name="_Nav item base">
      <Content7 />
    </div>
  );
}

function Navigation2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Navigation">
      <NavItemBase4 />
      <NavItemBase5 />
      <NavItemBase6 />
    </div>
  );
}

function LeadingElement7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Leading element">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d={svgPaths.p28235900} fill="var(--fill-0, #9EF2E6)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function Content8() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9ef2e6] text-[16px] tracking-[0.5px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Thème clair</p>
      </div>
    </div>
  );
}

function TrailingElement() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trailing element">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d="M10 17L15 12L10 7V17Z" fill="var(--fill-0, #9EF2E6)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function StateLayer6() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[56px] items-center px-[12px] py-[8px] relative shrink-0 w-[233px]" data-name="state-layer">
      <LeadingElement7 />
      <Content8 />
      <TrailingElement />
    </div>
  );
}

function LeadingElement8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Leading element">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path clipRule="evenodd" d={svgPaths.p1ee98100} fill="var(--fill-0, #9EF2E6)" fillRule="evenodd" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function Content9() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9ef2e6] text-[16px] tracking-[0.5px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">English</p>
      </div>
    </div>
  );
}

function TrailingElement1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trailing element">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d="M10 17L15 12L10 7V17Z" fill="var(--fill-0, #9EF2E6)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function StateLayer7() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[56px] items-center px-[12px] py-[8px] relative w-full">
          <LeadingElement8 />
          <Content9 />
          <TrailingElement1 />
        </div>
      </div>
    </div>
  );
}

function BuildingBlocksMenuListItem() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[233px]" data-name="Building Blocks/Menu List Item">
      <StateLayer7 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <StateLayer6 />
      <BuildingBlocksMenuListItem />
    </div>
  );
}

function ContrastBorder() {
  return <div className="absolute border-[0.75px] border-black border-solid inset-0 opacity-[0.08] rounded-[200px]" data-name="Contrast border" />;
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAvatar} />
      <ContrastBorder />
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[20px] relative shrink-0 text-nowrap text-white whitespace-pre" data-name="Text and supporting text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold not-italic relative shrink-0 text-[14px]">Antoine Dupont</p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal relative shrink-0 text-[12px] tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        antoine.dupont@univ-nantes.fr
      </p>
    </div>
  );
}

function AvatarLabelGroup() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Avatar label group">
      <Avatar />
      <TextAndSupportingText />
    </div>
  );
}

function LogOut() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="log-out-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="log-out-01">
          <path d={svgPaths.p2f81c180} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonsButton() {
  return (
    <div className="absolute box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[24px] right-0 rounded-[8px] top-0" data-name="Buttons/Button">
      <LogOut />
    </div>
  );
}

function Account() {
  return (
    <div className="box-border content-stretch flex gap-[16px] items-start overflow-clip pb-[8px] pl-[8px] pr-[32px] pt-[24px] relative shrink-0 w-[233px]" data-name="Account">
      <AvatarLabelGroup />
      <ButtonsButton />
    </div>
  );
}

function Footer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Footer">
      <div className="flex flex-col justify-end size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start justify-end pb-[15px] pt-0 px-[16px] relative w-full">
          <Navigation2 />
          <Frame />
          <Account />
        </div>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-between left-0 top-0 w-[280px]" data-name="Content">
      <Navigation1 />
      <Footer />
    </div>
  );
}

function MenuGauche() {
  return (
    <div className="absolute bg-[#006a61] h-[2104px] left-0 top-0 w-[280px]" data-name="Menu gauche">
      <Content10 />
      <div className="absolute h-0 left-[-1px] top-[896px] w-[280px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 1">
            <path d="M0 0.5H280" id="Vector 2137" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function DashboardMenuDeploye() {
  return (
    <div className="bg-white relative size-full" data-name="Dashboard_menu déployé">
      <Tabs />
      <BuildingBlocksCardStatesElevated />
      <BuildingBlocksCardStatesElevated1 />
      <BuildingBlocksCardStatesElevated2 />
      <BuildingBlocksCardStatesElevated3 />
      <BuildingBlocksCardStatesElevated4 />
      <BuildingBlocksCardStatesElevated5 />
      <BuildingBlocksCardStatesElevated6 />
      <Group45 />
      <div className="absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[312px] text-[#31111d] text-[32px] text-nowrap top-[51px] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[40px] whitespace-pre">Tableau de bord</p>
      </div>
      <MenuGauche />
    </div>
  );
}