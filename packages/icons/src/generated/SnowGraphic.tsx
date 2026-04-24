import type { SVGProps } from "react"

const SnowGraphic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 50 52"
    aria-hidden="true"
    {...props}
  >
    <g filter="url(#snow_graphic_svg__a)">
      <path
        fill="#3E5EFA"
        d="m26.102 22.48 9.06-5.232 1.455 2.52-9.073 5.237 9.087 5.247-1.454 2.519-9.075-5.24v10.487h-2.908v-10.5l-9.109 5.259-1.454-2.519 9.097-5.254-9.082-5.243 1.454-2.518 9.094 5.25V12h2.908z"
      />
    </g>
    <defs>
      <filter
        id="snow_graphic_svg__a"
        width={49.262}
        height={51.281}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={0.632} />
        <feGaussianBlur stdDeviation={6.316} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.760784 0 0 0 0 0.921569 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_248_1969"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_248_1969"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
export default SnowGraphic
