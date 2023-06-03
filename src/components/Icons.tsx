

export function Success() {
  const sizePx = "32px"
  return (
    <svg
      className="inline svg-black fill-offWhite"
      xmlns="http://www.w3.org/2000/svg" width={sizePx} height={sizePx} viewBox="0 0 1024 1024">
      <path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" />
    </svg>
  )
}

export function Failure() {

  const sizePx = "36px"
  return (
    <svg
      className="inline svg-black fill-offWhite"
      xmlns="http://www.w3.org/2000/svg" width={sizePx} height={sizePx} viewBox="0 0 512 512" version="1.1">
      <path d="M192,1.42108547e-14 C298.038672,1.42108547e-14 384,85.961328 384,192 C384,298.038672 298.038672,384 192,384 C85.961328,384 1.42108547e-14,298.038672 1.42108547e-14,192 C1.42108547e-14,85.961328 85.961328,1.42108547e-14 192,1.42108547e-14 Z M273.018158,80.8239578 L192.012,161.83 L111.156702,80.9748073 L80.9868126,111.144697 L161.842,192 L80.9868126,272.855303 L111.156702,303.025193 L192.012,222.17 L273.018158,303.176042 L303.188047,273.006153 L222.182,192 L303.188047,110.993847 L273.018158,80.8239578 Z">
      </path>
    </svg >
  )

}