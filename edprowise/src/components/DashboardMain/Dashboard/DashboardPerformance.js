import React from "react";

const DashboardPerformance = () => {
  return (
    <>
      <div className="col-xxl-8">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="card-title">Performance</h4>
              <div>
                <button type="button" className="btn btn-sm btn-outline-light">
                  ALL
                </button>
                <button type="button" className="btn btn-sm btn-outline-light">
                  1M
                </button>
                <button type="button" className="btn btn-sm btn-outline-light">
                  6M
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light active"
                >
                  1Y
                </button>
              </div>
            </div>{" "}
            {/* end card-title*/}
            <div dir="ltr">
              <div
                id="dash-performance-chart"
                className="apex-charts"
                style={{ minHeight: 328 }}
              >
                <div
                  id="apexcharts103ux9gk"
                  className="apexcharts-canvas apexcharts103ux9gk apexcharts-theme-light"
                  style={{ width: 731, height: 313 }}
                >
                  <svg
                    // id="SvgjsSvg1241"
                    // width={731}
                    // height={313}
                    // xmlns="http://www.w3.org/2000/svg"
                    // version="1.1"
                    // xmlnsXlink="http://www.w3.org/1999/xlink"
                    // xmlns:svgjs="http://svgjs.dev"
                    // className="apexcharts-svg apexcharts-zoomable hovering-zoom"
                    // xmlns:data="ApexChartsNS"
                    // transform="translate(0, 0)"
                    // style={{ background: "transparent" }}
                    version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="apexcharts-svg apexcharts-zoomable hovering-zoom"
                    xmlnsData="ApexChartsNS"
                    transform="translate(0, 0)"
                  >
                    <foreignObject x={0} y={0} width={731} height={313}>
                      <div
                        className="apexcharts-legend apexcharts-align-center apx-legend-position-bottom"
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                          inset: "auto 0px 0px 20px",
                          position: "absolute",
                          maxHeight: "156.5px",
                        }}
                      >
                        <div
                          className="apexcharts-legend-series"
                          rel={1}
                          seriesname="PagexViews"
                          data:collapsed="false"
                          style={{ margin: "0px 10px" }}
                        >
                          <span
                            className="apexcharts-legend-marker"
                            rel={1}
                            data:collapsed="false"
                            style={{
                              background: "rgb(255, 108, 47) !important",
                              color: "rgb(255, 108, 47)",
                              height: 9,
                              width: 9,
                              left: 0,
                              top: 0,
                              borderWidth: 0,
                              borderColor: "rgb(255, 255, 255)",
                              borderRadius: 6,
                            }}
                          />
                          <span
                            className="apexcharts-legend-text"
                            rel={1}
                            i={0}
                            data:default-text="Page%20Views"
                            data:collapsed="false"
                            style={{
                              color: "rgb(55, 61, 63)",
                              fontSize: 12,
                              fontWeight: 400,
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            Page Views
                          </span>
                        </div>
                        <div
                          className="apexcharts-legend-series"
                          rel={2}
                          seriesname="Clicks"
                          data:collapsed="false"
                          style={{ margin: "0px 10px" }}
                        >
                          <span
                            className="apexcharts-legend-marker"
                            rel={2}
                            data:collapsed="false"
                            style={{
                              background: "rgb(34, 197, 94) !important",
                              color: "rgb(34, 197, 94)",
                              height: 9,
                              width: 9,
                              left: 0,
                              top: 0,
                              borderWidth: 0,
                              borderColor: "rgb(255, 255, 255)",
                              borderRadius: 6,
                            }}
                          />
                          <span
                            className="apexcharts-legend-text"
                            rel={2}
                            i={1}
                            data:default-text="Clicks"
                            data:collapsed="false"
                            style={{
                              color: "rgb(55, 61, 63)",
                              fontSize: 12,
                              fontWeight: 400,
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            Clicks
                          </span>
                        </div>
                      </div>
                      <style
                        type="text/css"
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n      .apexcharts-legend {\n        display: flex;\n        overflow: auto;\n        padding: 0 10px;\n      }\n      .apexcharts-legend.apx-legend-position-bottom, .apexcharts-legend.apx-legend-position-top {\n        flex-wrap: wrap\n      }\n      .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {\n        flex-direction: column;\n        bottom: 0;\n      }\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-left, .apexcharts-legend.apx-legend-position-top.apexcharts-align-left, .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {\n        justify-content: flex-start;\n      }\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center, .apexcharts-legend.apx-legend-position-top.apexcharts-align-center {\n        justify-content: center;\n      }\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-right, .apexcharts-legend.apx-legend-position-top.apexcharts-align-right {\n        justify-content: flex-end;\n      }\n      .apexcharts-legend-series {\n        cursor: pointer;\n        line-height: normal;\n      }\n      .apexcharts-legend.apx-legend-position-bottom .apexcharts-legend-series, .apexcharts-legend.apx-legend-position-top .apexcharts-legend-series{\n        display: flex;\n        align-items: center;\n      }\n      .apexcharts-legend-text {\n        position: relative;\n        font-size: 14px;\n      }\n      .apexcharts-legend-text *, .apexcharts-legend-marker * {\n        pointer-events: none;\n      }\n      .apexcharts-legend-marker {\n        position: relative;\n        display: inline-block;\n        cursor: pointer;\n        margin-right: 3px;\n        border-style: solid;\n      }\n\n      .apexcharts-legend.apexcharts-align-right .apexcharts-legend-series, .apexcharts-legend.apexcharts-align-left .apexcharts-legend-series{\n        display: inline-block;\n      }\n      .apexcharts-legend-series.apexcharts-no-click {\n        cursor: auto;\n      }\n      .apexcharts-legend .apexcharts-hidden-zero-series, .apexcharts-legend .apexcharts-hidden-null-series {\n        display: none !important;\n      }\n      .apexcharts-inactive-legend {\n        opacity: 0.45;\n      }",
                        }}
                      />
                    </foreignObject>
                    <rect
                      id="SvgjsRect1246"
                      width={0}
                      height={0}
                      x={0}
                      y={0}
                      rx={0}
                      ry={0}
                      opacity={1}
                      strokeWidth={0}
                      stroke="none"
                      strokeDasharray={0}
                      fill="#fefefe"
                    />
                    <g
                      id="SvgjsG1344"
                      className="apexcharts-yaxis"
                      rel={0}
                      transform="translate(9.51767635345459, 0)"
                    >
                      <g id="SvgjsG1345" className="apexcharts-yaxis-texts-g">
                        <text
                          id="SvgjsText1347"
                          fontFamily="Helvetica, Arial, sans-serif"
                          x={20}
                          y="31.8"
                          textAnchor="end"
                          dominantBaseline="auto"
                          fontSize="11px"
                          fontWeight={400}
                          fill="#373d3f"
                          className="apexcharts-text apexcharts-yaxis-label "
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                        >
                          <tspan id="SvgjsTspan1348">80</tspan>
                          <title>80</title>
                        </text>
                        <text
                          id="SvgjsText1350"
                          fontFamily="Helvetica, Arial, sans-serif"
                          x={20}
                          y="60.67439992284774"
                          textAnchor="end"
                          dominantBaseline="auto"
                          fontSize="11px"
                          fontWeight={400}
                          fill="#373d3f"
                          className="apexcharts-text apexcharts-yaxis-label "
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                        >
                          <tspan id="SvgjsTspan1351">70</tspan>
                          <title>70</title>
                        </text>
                        <text
                          id="SvgjsText1353"
                          fontFamily="Helvetica, Arial, sans-serif"
                          x={20}
                          y="89.54879984569548"
                          textAnchor="end"
                          dominantBaseline="auto"
                          fontSize="11px"
                          fontWeight={400}
                          fill="#373d3f"
                          className="apexcharts-text apexcharts-yaxis-label "
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                        >
                          <tspan id="SvgjsTspan1354">60</tspan>
                          <title>60</title>
                        </text>
                        <text
                          id="SvgjsText1356"
                          fontFamily="Helvetica, Arial, sans-serif"
                          x={20}
                          y="118.42319976854323"
                          textAnchor="end"
                          dominantBaseline="auto"
                          fontSize="11px"
                          fontWeight={400}
                          fill="#373d3f"
                          className="apexcharts-text apexcharts-yaxis-label "
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                        >
                          <tspan id="SvgjsTspan1357">50</tspan>
                          <title>50</title>
                        </text>
                        <text
                          id="SvgjsText1359"
                          fontFamily="Helvetica, Arial, sans-serif"
                          x={20}
                          y="147.29759969139099"
                          textAnchor="end"
                          dominantBaseline="auto"
                          fontSize="11px"
                          fontWeight={400}
                          fill="#373d3f"
                          className="apexcharts-text apexcharts-yaxis-label "
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                        >
                          <tspan id="SvgjsTspan1360">40</tspan>
                          <title>40</title>
                        </text>
                        <text
                          id="SvgjsText1362"
                          fontFamily="Helvetica, Arial, sans-serif"
                          x={20}
                          y="176.17199961423873"
                          textAnchor="end"
                          dominantBaseline="auto"
                          fontSize="11px"
                          fontWeight={400}
                          fill="#373d3f"
                          className="apexcharts-text apexcharts-yaxis-label "
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                        >
                          <tspan id="SvgjsTspan1363">30</tspan>
                          <title>30</title>
                        </text>
                        <text
                          id="SvgjsText1365"
                          fontFamily="Helvetica, Arial, sans-serif"
                          x={20}
                          y="205.04639953708647"
                          textAnchor="end"
                          dominantBaseline="auto"
                          fontSize="11px"
                          fontWeight={400}
                          fill="#373d3f"
                          className="apexcharts-text apexcharts-yaxis-label "
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                        >
                          <tspan id="SvgjsTspan1366">20</tspan>
                          <title>20</title>
                        </text>
                        <text
                          id="SvgjsText1368"
                          fontFamily="Helvetica, Arial, sans-serif"
                          x={20}
                          y="233.92079945993422"
                          textAnchor="end"
                          dominantBaseline="auto"
                          fontSize="11px"
                          fontWeight={400}
                          fill="#373d3f"
                          className="apexcharts-text apexcharts-yaxis-label "
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                        >
                          <tspan id="SvgjsTspan1369">10</tspan>
                          <title>10</title>
                        </text>
                        <text
                          id="SvgjsText1371"
                          fontFamily="Helvetica, Arial, sans-serif"
                          x={20}
                          y="262.79519938278196"
                          textAnchor="end"
                          dominantBaseline="auto"
                          fontSize="11px"
                          fontWeight={400}
                          fill="#373d3f"
                          className="apexcharts-text apexcharts-yaxis-label "
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                        >
                          <tspan id="SvgjsTspan1372">0</tspan>
                          <title>0</title>
                        </text>
                      </g>
                    </g>
                    <g
                      id="SvgjsG1243"
                      className="apexcharts-inner apexcharts-graphical"
                      transform="translate(60.16165095242587, 30)"
                    >
                      <defs id="SvgjsDefs1242">
                        <clipPath id="gridRectMask103ux9gk">
                          <rect
                            id="SvgjsRect1248"
                            width="689.6124019622802"
                            height="236.99519938278195"
                            x="-21.64397459897128"
                            y={-3}
                            rx={0}
                            ry={0}
                            opacity={1}
                            strokeWidth={0}
                            stroke="none"
                            strokeDasharray={0}
                            fill="#fff"
                          />
                        </clipPath>
                        <clipPath id="forecastMask103ux9gk" />
                        <clipPath id="nonForecastMask103ux9gk" />
                        <clipPath id="gridRectMarkerMask103ux9gk">
                          <rect
                            id="SvgjsRect1249"
                            width="650.3244527643377"
                            height="234.99519938278195"
                            x={-2}
                            y={-2}
                            rx={0}
                            ry={0}
                            opacity={1}
                            strokeWidth={0}
                            stroke="none"
                            strokeDasharray={0}
                            fill="#fff"
                          />
                        </clipPath>
                        <linearGradient
                          id="SvgjsLinearGradient1254"
                          x1={0}
                          y1={0}
                          x2={0}
                          y2={1}
                        >
                          <stop
                            id="SvgjsStop1255"
                            stopOpacity="0.5"
                            stopColor="rgba(34,197,94,0.5)"
                            offset={0}
                          />
                          <stop
                            id="SvgjsStop1256"
                            stopOpacity={0}
                            stopColor="rgba(17,99,47,0)"
                            offset="0.9"
                          />
                          <stop
                            id="SvgjsStop1257"
                            stopOpacity={0}
                            stopColor="rgba(17,99,47,0)"
                            offset={1}
                          />
                        </linearGradient>
                      </defs>
                      <line
                        id="SvgjsLine1247"
                        x1="528.3109158980945"
                        y1={0}
                        x2="528.3109158980945"
                        y2="230.99519938278195"
                        stroke="#b6b6b6"
                        strokeDasharray={3}
                        strokeLinecap="butt"
                        className="apexcharts-xcrosshairs"
                        x="528.3109158980945"
                        y={0}
                        width={1}
                        height="230.99519938278195"
                        fill="#b1b9c4"
                        filter="none"
                        fillOpacity="0.9"
                        strokeWidth={1}
                      />
                      <g id="SvgjsG1289" className="apexcharts-grid">
                        <g
                          id="SvgjsG1290"
                          className="apexcharts-gridlines-horizontal"
                        >
                          <line
                            id="SvgjsLine1294"
                            x1="-18.64397459897128"
                            y1="28.874399922847743"
                            x2="664.9684273633089"
                            y2="28.874399922847743"
                            stroke="#e0e0e0"
                            strokeDasharray={3}
                            strokeLinecap="butt"
                            className="apexcharts-gridline"
                          />
                          <line
                            id="SvgjsLine1295"
                            x1="-18.64397459897128"
                            y1="57.74879984569549"
                            x2="664.9684273633089"
                            y2="57.74879984569549"
                            stroke="#e0e0e0"
                            strokeDasharray={3}
                            strokeLinecap="butt"
                            className="apexcharts-gridline"
                          />
                          <line
                            id="SvgjsLine1296"
                            x1="-18.64397459897128"
                            y1="86.62319976854323"
                            x2="664.9684273633089"
                            y2="86.62319976854323"
                            stroke="#e0e0e0"
                            strokeDasharray={3}
                            strokeLinecap="butt"
                            className="apexcharts-gridline"
                          />
                          <line
                            id="SvgjsLine1297"
                            x1="-18.64397459897128"
                            y1="115.49759969139097"
                            x2="664.9684273633089"
                            y2="115.49759969139097"
                            stroke="#e0e0e0"
                            strokeDasharray={3}
                            strokeLinecap="butt"
                            className="apexcharts-gridline"
                          />
                          <line
                            id="SvgjsLine1298"
                            x1="-18.64397459897128"
                            y1="144.37199961423872"
                            x2="664.9684273633089"
                            y2="144.37199961423872"
                            stroke="#e0e0e0"
                            strokeDasharray={3}
                            strokeLinecap="butt"
                            className="apexcharts-gridline"
                          />
                          <line
                            id="SvgjsLine1299"
                            x1="-18.64397459897128"
                            y1="173.24639953708646"
                            x2="664.9684273633089"
                            y2="173.24639953708646"
                            stroke="#e0e0e0"
                            strokeDasharray={3}
                            strokeLinecap="butt"
                            className="apexcharts-gridline"
                          />
                          <line
                            id="SvgjsLine1300"
                            x1="-18.64397459897128"
                            y1="202.1207994599342"
                            x2="664.9684273633089"
                            y2="202.1207994599342"
                            stroke="#e0e0e0"
                            strokeDasharray={3}
                            strokeLinecap="butt"
                            className="apexcharts-gridline"
                          />
                        </g>
                        <g
                          id="SvgjsG1291"
                          className="apexcharts-gridlines-vertical"
                        />
                        <line
                          id="SvgjsLine1303"
                          x1={0}
                          y1="230.99519938278195"
                          x2="646.3244527643377"
                          y2="230.99519938278195"
                          stroke="transparent"
                          strokeDasharray={0}
                          strokeLinecap="butt"
                        />
                        <line
                          id="SvgjsLine1302"
                          x1={0}
                          y1={1}
                          x2={0}
                          y2="230.99519938278195"
                          stroke="transparent"
                          strokeDasharray={0}
                          strokeLinecap="butt"
                        />
                      </g>
                      <g id="SvgjsG1292" className="apexcharts-grid-borders">
                        <line
                          id="SvgjsLine1293"
                          x1="-18.64397459897128"
                          y1={0}
                          x2="664.9684273633089"
                          y2={0}
                          stroke="#e0e0e0"
                          strokeDasharray={3}
                          strokeLinecap="butt"
                          className="apexcharts-gridline"
                        />
                        <line
                          id="SvgjsLine1301"
                          x1="-18.64397459897128"
                          y1="230.99519938278195"
                          x2="664.9684273633089"
                          y2="230.99519938278195"
                          stroke="#e0e0e0"
                          strokeDasharray={3}
                          strokeLinecap="butt"
                          className="apexcharts-gridline"
                        />
                      </g>
                      <g
                        id="SvgjsG1250"
                        className="apexcharts-area-series apexcharts-plot-series"
                      >
                        <g
                          id="SvgjsG1251"
                          className="apexcharts-series"
                          zindex={1}
                          seriesname="Clicks"
                          data:longestseries="true"
                          rel={1}
                          data:realindex={1}
                        >
                          <path
                            id="SvgjsPath1258"
                            d="M 0 230.99519938278195 L 0 207.89567944450374C 20.564868951592565 207.89567944450374 38.19189948152905 196.34591947536467 58.756768433121614 196.34591947536467C 79.32163738471418 196.34591947536467 96.94866791465066 210.78311943678852 117.51353686624323 210.78311943678852C 138.0784058178358 210.78311943678852 155.7054363477723 181.90871951394078 176.27030529936485 181.90871951394078C 196.8351742509574 181.90871951394078 214.4622047808939 170.35895954480168 235.02707373248646 170.35895954480168C 255.59194268407902 170.35895954480168 273.2189732140155 199.23335946764942 293.78384216560806 199.23335946764942C 314.34871111720065 199.23335946764942 331.9757416471371 216.5579994213581 352.5406105987297 216.5579994213581C 373.10547955032223 216.5579994213581 390.73251008025875 205.008239452219 411.2973790318513 205.008239452219C 431.86224798344386 205.008239452219 449.4892785133803 210.78311943678852 470.0541474649729 210.78311943678852C 490.6190164165655 210.78311943678852 508.24604694650196 147.2594396065235 528.8109158980945 147.2594396065235C 549.3757848496871 147.2594396065235 567.0028153796236 196.34591947536467 587.5676843312161 196.34591947536467C 608.1325532828087 196.34591947536467 625.7595838127452 129.93479965281483 646.3244527643377 129.93479965281483C 646.3244527643377 129.93479965281483 646.3244527643377 129.93479965281483 646.3244527643377 230.99519938278195M 646.3244527643377 129.93479965281483z"
                            fill="url(#SvgjsLinearGradient1254)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-area"
                            index={1}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 0 230.99519938278195 L 0 207.89567944450374C 20.564868951592565 207.89567944450374 38.19189948152905 196.34591947536467 58.756768433121614 196.34591947536467C 79.32163738471418 196.34591947536467 96.94866791465066 210.78311943678852 117.51353686624323 210.78311943678852C 138.0784058178358 210.78311943678852 155.7054363477723 181.90871951394078 176.27030529936485 181.90871951394078C 196.8351742509574 181.90871951394078 214.4622047808939 170.35895954480168 235.02707373248646 170.35895954480168C 255.59194268407902 170.35895954480168 273.2189732140155 199.23335946764942 293.78384216560806 199.23335946764942C 314.34871111720065 199.23335946764942 331.9757416471371 216.5579994213581 352.5406105987297 216.5579994213581C 373.10547955032223 216.5579994213581 390.73251008025875 205.008239452219 411.2973790318513 205.008239452219C 431.86224798344386 205.008239452219 449.4892785133803 210.78311943678852 470.0541474649729 210.78311943678852C 490.6190164165655 210.78311943678852 508.24604694650196 147.2594396065235 528.8109158980945 147.2594396065235C 549.3757848496871 147.2594396065235 567.0028153796236 196.34591947536467 587.5676843312161 196.34591947536467C 608.1325532828087 196.34591947536467 625.7595838127452 129.93479965281483 646.3244527643377 129.93479965281483C 646.3244527643377 129.93479965281483 646.3244527643377 129.93479965281483 646.3244527643377 230.99519938278195M 646.3244527643377 129.93479965281483z"
                            pathfrom="M -1 230.99519938278195 L -1 230.99519938278195 L 58.756768433121614 230.99519938278195 L 117.51353686624323 230.99519938278195 L 176.27030529936485 230.99519938278195 L 235.02707373248646 230.99519938278195 L 293.78384216560806 230.99519938278195 L 352.5406105987297 230.99519938278195 L 411.2973790318513 230.99519938278195 L 470.0541474649729 230.99519938278195 L 528.8109158980945 230.99519938278195 L 587.5676843312161 230.99519938278195 L 646.3244527643377 230.99519938278195"
                          />
                          <path
                            id="SvgjsPath1259"
                            d="M 0 207.89567944450374C 20.564868951592565 207.89567944450374 38.19189948152905 196.34591947536467 58.756768433121614 196.34591947536467C 79.32163738471418 196.34591947536467 96.94866791465066 210.78311943678852 117.51353686624323 210.78311943678852C 138.0784058178358 210.78311943678852 155.7054363477723 181.90871951394078 176.27030529936485 181.90871951394078C 196.8351742509574 181.90871951394078 214.4622047808939 170.35895954480168 235.02707373248646 170.35895954480168C 255.59194268407902 170.35895954480168 273.2189732140155 199.23335946764942 293.78384216560806 199.23335946764942C 314.34871111720065 199.23335946764942 331.9757416471371 216.5579994213581 352.5406105987297 216.5579994213581C 373.10547955032223 216.5579994213581 390.73251008025875 205.008239452219 411.2973790318513 205.008239452219C 431.86224798344386 205.008239452219 449.4892785133803 210.78311943678852 470.0541474649729 210.78311943678852C 490.6190164165655 210.78311943678852 508.24604694650196 147.2594396065235 528.8109158980945 147.2594396065235C 549.3757848496871 147.2594396065235 567.0028153796236 196.34591947536467 587.5676843312161 196.34591947536467C 608.1325532828087 196.34591947536467 625.7595838127452 129.93479965281483 646.3244527643377 129.93479965281483"
                            fill="none"
                            fillOpacity={1}
                            stroke="#22c55e"
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={2}
                            strokeDasharray={0}
                            className="apexcharts-area"
                            index={1}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 0 207.89567944450374C 20.564868951592565 207.89567944450374 38.19189948152905 196.34591947536467 58.756768433121614 196.34591947536467C 79.32163738471418 196.34591947536467 96.94866791465066 210.78311943678852 117.51353686624323 210.78311943678852C 138.0784058178358 210.78311943678852 155.7054363477723 181.90871951394078 176.27030529936485 181.90871951394078C 196.8351742509574 181.90871951394078 214.4622047808939 170.35895954480168 235.02707373248646 170.35895954480168C 255.59194268407902 170.35895954480168 273.2189732140155 199.23335946764942 293.78384216560806 199.23335946764942C 314.34871111720065 199.23335946764942 331.9757416471371 216.5579994213581 352.5406105987297 216.5579994213581C 373.10547955032223 216.5579994213581 390.73251008025875 205.008239452219 411.2973790318513 205.008239452219C 431.86224798344386 205.008239452219 449.4892785133803 210.78311943678852 470.0541474649729 210.78311943678852C 490.6190164165655 210.78311943678852 508.24604694650196 147.2594396065235 528.8109158980945 147.2594396065235C 549.3757848496871 147.2594396065235 567.0028153796236 196.34591947536467 587.5676843312161 196.34591947536467C 608.1325532828087 196.34591947536467 625.7595838127452 129.93479965281483 646.3244527643377 129.93479965281483"
                            pathfrom="M -1 230.99519938278195 L -1 230.99519938278195 L 58.756768433121614 230.99519938278195 L 117.51353686624323 230.99519938278195 L 176.27030529936485 230.99519938278195 L 235.02707373248646 230.99519938278195 L 293.78384216560806 230.99519938278195 L 352.5406105987297 230.99519938278195 L 411.2973790318513 230.99519938278195 L 470.0541474649729 230.99519938278195 L 528.8109158980945 230.99519938278195 L 587.5676843312161 230.99519938278195 L 646.3244527643377 230.99519938278195"
                            fillRule="evenodd"
                          />
                          <g
                            id="SvgjsG1252"
                            className="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
                            data:realindex={1}
                          >
                            <g className="apexcharts-series-markers">
                              <circle
                                id="SvgjsCircle1376"
                                r={0}
                                cx={0}
                                cy={0}
                                className="apexcharts-marker wlnj28yiq"
                                stroke="#ffffff"
                                fill="#22c55e"
                                fillOpacity={1}
                                strokeWidth={2}
                                strokeOpacity="0.9"
                                default-marker-size={0}
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                      <g
                        id="SvgjsG1260"
                        className="apexcharts-bar-series apexcharts-plot-series"
                      >
                        <g
                          id="SvgjsG1261"
                          className="apexcharts-series"
                          rel={1}
                          seriesname="PagexViews"
                          data:realindex={0}
                        >
                          <path
                            id="SvgjsPath1266"
                            d="M -8.813515264968242 227.99619938278195 L -8.813515264968242 135.82323964509962 C -8.813515264968242 134.32323964509962 -7.313515264968242 132.82323964509962 -5.813515264968242 132.82323964509962 L 5.813515264968242 132.82323964509962 C 7.313515264968242 132.82323964509962 8.813515264968242 134.32323964509962 8.813515264968242 135.82323964509962 L 8.813515264968242 227.99619938278195 C 8.813515264968242 229.49619938278195 7.313515264968242 230.99619938278195 5.813515264968242 230.99619938278195 L -5.813515264968242 230.99619938278195 C -7.313515264968242 230.99619938278195 -8.813515264968242 229.49619938278195 -8.813515264968242 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M -8.813515264968242 227.99619938278195 L -8.813515264968242 135.82323964509962 C -8.813515264968242 134.32323964509962 -7.313515264968242 132.82323964509962 -5.813515264968242 132.82323964509962 L 5.813515264968242 132.82323964509962 C 7.313515264968242 132.82323964509962 8.813515264968242 134.32323964509962 8.813515264968242 135.82323964509962 L 8.813515264968242 227.99619938278195 C 8.813515264968242 229.49619938278195 7.313515264968242 230.99619938278195 5.813515264968242 230.99619938278195 L -5.813515264968242 230.99619938278195 C -7.313515264968242 230.99619938278195 -8.813515264968242 229.49619938278195 -8.813515264968242 227.99619938278195 Z "
                            pathfrom="M -8.813515264968242 230.99619938278195 L -8.813515264968242 230.99619938278195 L 8.813515264968242 230.99619938278195 L 8.813515264968242 230.99619938278195 L 8.813515264968242 230.99619938278195 L 8.813515264968242 230.99619938278195 L 8.813515264968242 230.99619938278195 L -8.813515264968242 230.99619938278195 Z"
                            cy="132.82223964509961"
                            cx="8.813515264968242"
                            j={0}
                            val={34}
                            barheight="98.17295973768232"
                            barwidth="17.627030529936484"
                          />
                          <path
                            id="SvgjsPath1268"
                            d="M 49.943253168153376 227.99619938278195 L 49.943253168153376 46.31259988427163 C 49.943253168153376 44.81259988427163 51.443253168153376 43.31259988427163 52.943253168153376 43.31259988427163 L 64.57028369808987 43.31259988427163 C 66.07028369808987 43.31259988427163 67.57028369808987 44.81259988427163 67.57028369808987 46.31259988427163 L 67.57028369808987 227.99619938278195 C 67.57028369808987 229.49619938278195 66.07028369808987 230.99619938278195 64.57028369808987 230.99619938278195 L 52.943253168153376 230.99619938278195 C 51.443253168153376 230.99619938278195 49.943253168153376 229.49619938278195 49.943253168153376 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 49.943253168153376 227.99619938278195 L 49.943253168153376 46.31259988427163 C 49.943253168153376 44.81259988427163 51.443253168153376 43.31259988427163 52.943253168153376 43.31259988427163 L 64.57028369808987 43.31259988427163 C 66.07028369808987 43.31259988427163 67.57028369808987 44.81259988427163 67.57028369808987 46.31259988427163 L 67.57028369808987 227.99619938278195 C 67.57028369808987 229.49619938278195 66.07028369808987 230.99619938278195 64.57028369808987 230.99619938278195 L 52.943253168153376 230.99619938278195 C 51.443253168153376 230.99619938278195 49.943253168153376 229.49619938278195 49.943253168153376 227.99619938278195 Z "
                            pathfrom="M 49.943253168153376 230.99619938278195 L 49.943253168153376 230.99619938278195 L 67.57028369808987 230.99619938278195 L 67.57028369808987 230.99619938278195 L 67.57028369808987 230.99619938278195 L 67.57028369808987 230.99619938278195 L 67.57028369808987 230.99619938278195 L 49.943253168153376 230.99619938278195 Z"
                            cy="43.31159988427163"
                            cx="67.57028369808987"
                            j={1}
                            val={65}
                            barheight="187.68359949851032"
                            barwidth="17.627030529936484"
                          />
                          <path
                            id="SvgjsPath1270"
                            d="M 108.70002160127498 227.99619938278195 L 108.70002160127498 101.17395973768234 C 108.70002160127498 99.67395973768234 110.20002160127498 98.17395973768234 111.70002160127498 98.17395973768234 L 123.32705213121147 98.17395973768234 C 124.82705213121147 98.17395973768234 126.32705213121147 99.67395973768234 126.32705213121147 101.17395973768234 L 126.32705213121147 227.99619938278195 C 126.32705213121147 229.49619938278195 124.82705213121147 230.99619938278195 123.32705213121147 230.99619938278195 L 111.70002160127498 230.99619938278195 C 110.20002160127498 230.99619938278195 108.70002160127498 229.49619938278195 108.70002160127498 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 108.70002160127498 227.99619938278195 L 108.70002160127498 101.17395973768234 C 108.70002160127498 99.67395973768234 110.20002160127498 98.17395973768234 111.70002160127498 98.17395973768234 L 123.32705213121147 98.17395973768234 C 124.82705213121147 98.17395973768234 126.32705213121147 99.67395973768234 126.32705213121147 101.17395973768234 L 126.32705213121147 227.99619938278195 C 126.32705213121147 229.49619938278195 124.82705213121147 230.99619938278195 123.32705213121147 230.99619938278195 L 111.70002160127498 230.99619938278195 C 110.20002160127498 230.99619938278195 108.70002160127498 229.49619938278195 108.70002160127498 227.99619938278195 Z "
                            pathfrom="M 108.70002160127498 230.99619938278195 L 108.70002160127498 230.99619938278195 L 126.32705213121147 230.99619938278195 L 126.32705213121147 230.99619938278195 L 126.32705213121147 230.99619938278195 L 126.32705213121147 230.99619938278195 L 126.32705213121147 230.99619938278195 L 108.70002160127498 230.99619938278195 Z"
                            cy="98.17295973768233"
                            cx="126.32705213121147"
                            j={2}
                            val={46}
                            barheight="132.82223964509961"
                            barwidth="17.627030529936484"
                          />
                          <path
                            id="SvgjsPath1272"
                            d="M 167.45679003439662 227.99619938278195 L 167.45679003439662 37.65027990741731 C 167.45679003439662 36.15027990741731 168.95679003439662 34.65027990741731 170.45679003439662 34.65027990741731 L 182.0838205643331 34.65027990741731 C 183.5838205643331 34.65027990741731 185.0838205643331 36.15027990741731 185.0838205643331 37.65027990741731 L 185.0838205643331 227.99619938278195 C 185.0838205643331 229.49619938278195 183.5838205643331 230.99619938278195 182.0838205643331 230.99619938278195 L 170.45679003439662 230.99619938278195 C 168.95679003439662 230.99619938278195 167.45679003439662 229.49619938278195 167.45679003439662 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 167.45679003439662 227.99619938278195 L 167.45679003439662 37.65027990741731 C 167.45679003439662 36.15027990741731 168.95679003439662 34.65027990741731 170.45679003439662 34.65027990741731 L 182.0838205643331 34.65027990741731 C 183.5838205643331 34.65027990741731 185.0838205643331 36.15027990741731 185.0838205643331 37.65027990741731 L 185.0838205643331 227.99619938278195 C 185.0838205643331 229.49619938278195 183.5838205643331 230.99619938278195 182.0838205643331 230.99619938278195 L 170.45679003439662 230.99619938278195 C 168.95679003439662 230.99619938278195 167.45679003439662 229.49619938278195 167.45679003439662 227.99619938278195 Z "
                            pathfrom="M 167.45679003439662 230.99619938278195 L 167.45679003439662 230.99619938278195 L 185.0838205643331 230.99619938278195 L 185.0838205643331 230.99619938278195 L 185.0838205643331 230.99619938278195 L 185.0838205643331 230.99619938278195 L 185.0838205643331 230.99619938278195 L 167.45679003439662 230.99619938278195 Z"
                            cy="34.64927990741731"
                            cx="185.0838205643331"
                            j={3}
                            val={68}
                            barheight="196.34591947536464"
                            barwidth="17.627030529936484"
                          />
                          <path
                            id="SvgjsPath1274"
                            d="M 226.21355846751823 227.99619938278195 L 226.21355846751823 92.51163976082802 C 226.21355846751823 91.01163976082802 227.71355846751823 89.51163976082802 229.21355846751823 89.51163976082802 L 240.84058899745472 89.51163976082802 C 242.34058899745472 89.51163976082802 243.84058899745472 91.01163976082802 243.84058899745472 92.51163976082802 L 243.84058899745472 227.99619938278195 C 243.84058899745472 229.49619938278195 242.34058899745472 230.99619938278195 240.84058899745472 230.99619938278195 L 229.21355846751823 230.99619938278195 C 227.71355846751823 230.99619938278195 226.21355846751823 229.49619938278195 226.21355846751823 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 226.21355846751823 227.99619938278195 L 226.21355846751823 92.51163976082802 C 226.21355846751823 91.01163976082802 227.71355846751823 89.51163976082802 229.21355846751823 89.51163976082802 L 240.84058899745472 89.51163976082802 C 242.34058899745472 89.51163976082802 243.84058899745472 91.01163976082802 243.84058899745472 92.51163976082802 L 243.84058899745472 227.99619938278195 C 243.84058899745472 229.49619938278195 242.34058899745472 230.99619938278195 240.84058899745472 230.99619938278195 L 229.21355846751823 230.99619938278195 C 227.71355846751823 230.99619938278195 226.21355846751823 229.49619938278195 226.21355846751823 227.99619938278195 Z "
                            pathfrom="M 226.21355846751823 230.99619938278195 L 226.21355846751823 230.99619938278195 L 243.84058899745472 230.99619938278195 L 243.84058899745472 230.99619938278195 L 243.84058899745472 230.99619938278195 L 243.84058899745472 230.99619938278195 L 243.84058899745472 230.99619938278195 L 226.21355846751823 230.99619938278195 Z"
                            cy="89.51063976082801"
                            cx="243.84058899745472"
                            j={4}
                            val={49}
                            barheight="141.48455962195393"
                            barwidth="17.627030529936484"
                          />
                          <path
                            id="SvgjsPath1276"
                            d="M 284.9703269006398 227.99619938278195 L 284.9703269006398 57.86235985341073 C 284.9703269006398 56.36235985341073 286.4703269006398 54.86235985341073 287.9703269006398 54.86235985341073 L 299.59735743057627 54.86235985341073 C 301.09735743057627 54.86235985341073 302.59735743057627 56.36235985341073 302.59735743057627 57.86235985341073 L 302.59735743057627 227.99619938278195 C 302.59735743057627 229.49619938278195 301.09735743057627 230.99619938278195 299.59735743057627 230.99619938278195 L 287.9703269006398 230.99619938278195 C 286.4703269006398 230.99619938278195 284.9703269006398 229.49619938278195 284.9703269006398 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 284.9703269006398 227.99619938278195 L 284.9703269006398 57.86235985341073 C 284.9703269006398 56.36235985341073 286.4703269006398 54.86235985341073 287.9703269006398 54.86235985341073 L 299.59735743057627 54.86235985341073 C 301.09735743057627 54.86235985341073 302.59735743057627 56.36235985341073 302.59735743057627 57.86235985341073 L 302.59735743057627 227.99619938278195 C 302.59735743057627 229.49619938278195 301.09735743057627 230.99619938278195 299.59735743057627 230.99619938278195 L 287.9703269006398 230.99619938278195 C 286.4703269006398 230.99619938278195 284.9703269006398 229.49619938278195 284.9703269006398 227.99619938278195 Z "
                            pathfrom="M 284.9703269006398 230.99619938278195 L 284.9703269006398 230.99619938278195 L 302.59735743057627 230.99619938278195 L 302.59735743057627 230.99619938278195 L 302.59735743057627 230.99619938278195 L 302.59735743057627 230.99619938278195 L 302.59735743057627 230.99619938278195 L 284.9703269006398 230.99619938278195 Z"
                            cy="54.86135985341073"
                            cx="302.59735743057627"
                            j={5}
                            val={61}
                            barheight="176.13383952937122"
                            barwidth="17.627030529936484"
                          />
                          <path
                            id="SvgjsPath1278"
                            d="M 343.72709533376144 227.99619938278195 L 343.72709533376144 112.72371970682144 C 343.72709533376144 111.22371970682144 345.22709533376144 109.72371970682144 346.72709533376144 109.72371970682144 L 358.3541258636979 109.72371970682144 C 359.8541258636979 109.72371970682144 361.3541258636979 111.22371970682144 361.3541258636979 112.72371970682144 L 361.3541258636979 227.99619938278195 C 361.3541258636979 229.49619938278195 359.8541258636979 230.99619938278195 358.3541258636979 230.99619938278195 L 346.72709533376144 230.99619938278195 C 345.22709533376144 230.99619938278195 343.72709533376144 229.49619938278195 343.72709533376144 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 343.72709533376144 227.99619938278195 L 343.72709533376144 112.72371970682144 C 343.72709533376144 111.22371970682144 345.22709533376144 109.72371970682144 346.72709533376144 109.72371970682144 L 358.3541258636979 109.72371970682144 C 359.8541258636979 109.72371970682144 361.3541258636979 111.22371970682144 361.3541258636979 112.72371970682144 L 361.3541258636979 227.99619938278195 C 361.3541258636979 229.49619938278195 359.8541258636979 230.99619938278195 358.3541258636979 230.99619938278195 L 346.72709533376144 230.99619938278195 C 345.22709533376144 230.99619938278195 343.72709533376144 229.49619938278195 343.72709533376144 227.99619938278195 Z "
                            pathfrom="M 343.72709533376144 230.99619938278195 L 343.72709533376144 230.99619938278195 L 361.3541258636979 230.99619938278195 L 361.3541258636979 230.99619938278195 L 361.3541258636979 230.99619938278195 L 361.3541258636979 230.99619938278195 L 361.3541258636979 230.99619938278195 L 343.72709533376144 230.99619938278195 Z"
                            cy="109.72271970682144"
                            cx="361.3541258636979"
                            j={6}
                            val={42}
                            barheight="121.27247967596051"
                            barwidth="17.627030529936484"
                          />
                          <path
                            id="SvgjsPath1280"
                            d="M 402.483863766883 227.99619938278195 L 402.483863766883 106.94883972225189 C 402.483863766883 105.44883972225189 403.983863766883 103.94883972225189 405.483863766883 103.94883972225189 L 417.1108942968195 103.94883972225189 C 418.6108942968195 103.94883972225189 420.1108942968195 105.44883972225189 420.1108942968195 106.94883972225189 L 420.1108942968195 227.99619938278195 C 420.1108942968195 229.49619938278195 418.6108942968195 230.99619938278195 417.1108942968195 230.99619938278195 L 405.483863766883 230.99619938278195 C 403.983863766883 230.99619938278195 402.483863766883 229.49619938278195 402.483863766883 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 402.483863766883 227.99619938278195 L 402.483863766883 106.94883972225189 C 402.483863766883 105.44883972225189 403.983863766883 103.94883972225189 405.483863766883 103.94883972225189 L 417.1108942968195 103.94883972225189 C 418.6108942968195 103.94883972225189 420.1108942968195 105.44883972225189 420.1108942968195 106.94883972225189 L 420.1108942968195 227.99619938278195 C 420.1108942968195 229.49619938278195 418.6108942968195 230.99619938278195 417.1108942968195 230.99619938278195 L 405.483863766883 230.99619938278195 C 403.983863766883 230.99619938278195 402.483863766883 229.49619938278195 402.483863766883 227.99619938278195 Z "
                            pathfrom="M 402.483863766883 230.99619938278195 L 402.483863766883 230.99619938278195 L 420.1108942968195 230.99619938278195 L 420.1108942968195 230.99619938278195 L 420.1108942968195 230.99619938278195 L 420.1108942968195 230.99619938278195 L 420.1108942968195 230.99619938278195 L 402.483863766883 230.99619938278195 Z"
                            cy="103.94783972225189"
                            cx="420.1108942968195"
                            j={7}
                            val={44}
                            barheight="127.04735966053006"
                            barwidth="17.627030529936484"
                          />
                          <path
                            id="SvgjsPath1282"
                            d="M 461.24063220000465 227.99619938278195 L 461.24063220000465 8.775879984569567 C 461.24063220000465 7.275879984569567 462.74063220000465 5.775879984569566 464.24063220000465 5.775879984569566 L 475.8676627299411 5.775879984569566 C 477.3676627299411 5.775879984569566 478.8676627299411 7.275879984569567 478.8676627299411 8.775879984569567 L 478.8676627299411 227.99619938278195 C 478.8676627299411 229.49619938278195 477.3676627299411 230.99619938278195 475.8676627299411 230.99619938278195 L 464.24063220000465 230.99619938278195 C 462.74063220000465 230.99619938278195 461.24063220000465 229.49619938278195 461.24063220000465 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 461.24063220000465 227.99619938278195 L 461.24063220000465 8.775879984569567 C 461.24063220000465 7.275879984569567 462.74063220000465 5.775879984569566 464.24063220000465 5.775879984569566 L 475.8676627299411 5.775879984569566 C 477.3676627299411 5.775879984569566 478.8676627299411 7.275879984569567 478.8676627299411 8.775879984569567 L 478.8676627299411 227.99619938278195 C 478.8676627299411 229.49619938278195 477.3676627299411 230.99619938278195 475.8676627299411 230.99619938278195 L 464.24063220000465 230.99619938278195 C 462.74063220000465 230.99619938278195 461.24063220000465 229.49619938278195 461.24063220000465 227.99619938278195 Z "
                            pathfrom="M 461.24063220000465 230.99619938278195 L 461.24063220000465 230.99619938278195 L 478.8676627299411 230.99619938278195 L 478.8676627299411 230.99619938278195 L 478.8676627299411 230.99619938278195 L 478.8676627299411 230.99619938278195 L 478.8676627299411 230.99619938278195 L 461.24063220000465 230.99619938278195 Z"
                            cy="5.774879984569566"
                            cx="478.8676627299411"
                            j={8}
                            val={78}
                            barheight="225.22031939821238"
                            barwidth="17.627030529936484"
                          />
                          <path
                            id="SvgjsPath1284"
                            d="M 519.9974006331263 227.99619938278195 L 519.9974006331263 83.8493197839737 C 519.9974006331263 82.3493197839737 521.4974006331263 80.8493197839737 522.9974006331263 80.8493197839737 L 534.6244311630628 80.8493197839737 C 536.1244311630628 80.8493197839737 537.6244311630628 82.3493197839737 537.6244311630628 83.8493197839737 L 537.6244311630628 227.99619938278195 C 537.6244311630628 229.49619938278195 536.1244311630628 230.99619938278195 534.6244311630628 230.99619938278195 L 522.9974006331263 230.99619938278195 C 521.4974006331263 230.99619938278195 519.9974006331263 229.49619938278195 519.9974006331263 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 519.9974006331263 227.99619938278195 L 519.9974006331263 83.8493197839737 C 519.9974006331263 82.3493197839737 521.4974006331263 80.8493197839737 522.9974006331263 80.8493197839737 L 534.6244311630628 80.8493197839737 C 536.1244311630628 80.8493197839737 537.6244311630628 82.3493197839737 537.6244311630628 83.8493197839737 L 537.6244311630628 227.99619938278195 C 537.6244311630628 229.49619938278195 536.1244311630628 230.99619938278195 534.6244311630628 230.99619938278195 L 522.9974006331263 230.99619938278195 C 521.4974006331263 230.99619938278195 519.9974006331263 229.49619938278195 519.9974006331263 227.99619938278195 Z "
                            pathfrom="M 519.9974006331263 230.99619938278195 L 519.9974006331263 230.99619938278195 L 537.6244311630628 230.99619938278195 L 537.6244311630628 230.99619938278195 L 537.6244311630628 230.99619938278195 L 537.6244311630628 230.99619938278195 L 537.6244311630628 230.99619938278195 L 519.9974006331263 230.99619938278195 Z"
                            cy="80.8483197839737"
                            cx="537.6244311630628"
                            j={9}
                            val={52}
                            barheight="150.14687959880825"
                            barwidth="17.627030529936484"
                          />
                          <path
                            id="SvgjsPath1286"
                            d="M 578.7541690662479 227.99619938278195 L 578.7541690662479 52.087479868841164 C 578.7541690662479 50.587479868841164 580.2541690662479 49.087479868841164 581.7541690662479 49.087479868841164 L 593.3811995961844 49.087479868841164 C 594.8811995961844 49.087479868841164 596.3811995961844 50.587479868841164 596.3811995961844 52.087479868841164 L 596.3811995961844 227.99619938278195 C 596.3811995961844 229.49619938278195 594.8811995961844 230.99619938278195 593.3811995961844 230.99619938278195 L 581.7541690662479 230.99619938278195 C 580.2541690662479 230.99619938278195 578.7541690662479 229.49619938278195 578.7541690662479 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 578.7541690662479 227.99619938278195 L 578.7541690662479 52.087479868841164 C 578.7541690662479 50.587479868841164 580.2541690662479 49.087479868841164 581.7541690662479 49.087479868841164 L 593.3811995961844 49.087479868841164 C 594.8811995961844 49.087479868841164 596.3811995961844 50.587479868841164 596.3811995961844 52.087479868841164 L 596.3811995961844 227.99619938278195 C 596.3811995961844 229.49619938278195 594.8811995961844 230.99619938278195 593.3811995961844 230.99619938278195 L 581.7541690662479 230.99619938278195 C 580.2541690662479 230.99619938278195 578.7541690662479 229.49619938278195 578.7541690662479 227.99619938278195 Z "
                            pathfrom="M 578.7541690662479 230.99619938278195 L 578.7541690662479 230.99619938278195 L 596.3811995961844 230.99619938278195 L 596.3811995961844 230.99619938278195 L 596.3811995961844 230.99619938278195 L 596.3811995961844 230.99619938278195 L 596.3811995961844 230.99619938278195 L 578.7541690662479 230.99619938278195 Z"
                            cy="49.08647986884117"
                            cx="596.3811995961844"
                            j={10}
                            val={63}
                            barheight="181.90871951394078"
                            barwidth="17.627030529936484"
                          />
                          <path
                            id="SvgjsPath1288"
                            d="M 637.5109374993694 227.99619938278195 L 637.5109374993694 40.53771989970206 C 637.5109374993694 39.03771989970206 639.0109374993694 37.53771989970206 640.5109374993694 37.53771989970206 L 652.137968029306 37.53771989970206 C 653.637968029306 37.53771989970206 655.137968029306 39.03771989970206 655.137968029306 40.53771989970206 L 655.137968029306 227.99619938278195 C 655.137968029306 229.49619938278195 653.637968029306 230.99619938278195 652.137968029306 230.99619938278195 L 640.5109374993694 230.99619938278195 C 639.0109374993694 230.99619938278195 637.5109374993694 229.49619938278195 637.5109374993694 227.99619938278195 Z "
                            fill="rgba(255,108,47,1)"
                            fillOpacity={1}
                            strokeOpacity={1}
                            strokeLinecap="butt"
                            strokeWidth={0}
                            strokeDasharray={0}
                            className="apexcharts-bar-area"
                            index={0}
                            clipPath="url(#gridRectMask103ux9gk)"
                            pathto="M 637.5109374993694 227.99619938278195 L 637.5109374993694 40.53771989970206 C 637.5109374993694 39.03771989970206 639.0109374993694 37.53771989970206 640.5109374993694 37.53771989970206 L 652.137968029306 37.53771989970206 C 653.637968029306 37.53771989970206 655.137968029306 39.03771989970206 655.137968029306 40.53771989970206 L 655.137968029306 227.99619938278195 C 655.137968029306 229.49619938278195 653.637968029306 230.99619938278195 652.137968029306 230.99619938278195 L 640.5109374993694 230.99619938278195 C 639.0109374993694 230.99619938278195 637.5109374993694 229.49619938278195 637.5109374993694 227.99619938278195 Z "
                            pathfrom="M 637.5109374993694 230.99619938278195 L 637.5109374993694 230.99619938278195 L 655.137968029306 230.99619938278195 L 655.137968029306 230.99619938278195 L 655.137968029306 230.99619938278195 L 655.137968029306 230.99619938278195 L 655.137968029306 230.99619938278195 L 637.5109374993694 230.99619938278195 Z"
                            cy="37.536719899702064"
                            cx="655.137968029306"
                            j={11}
                            val={67}
                            barheight="193.45847948307988"
                            barwidth="17.627030529936484"
                          />
                          <g
                            id="SvgjsG1263"
                            className="apexcharts-bar-goals-markers"
                          >
                            <g
                              id="SvgjsG1265"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                            <g
                              id="SvgjsG1267"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                            <g
                              id="SvgjsG1269"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                            <g
                              id="SvgjsG1271"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                            <g
                              id="SvgjsG1273"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                            <g
                              id="SvgjsG1275"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                            <g
                              id="SvgjsG1277"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                            <g
                              id="SvgjsG1279"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                            <g
                              id="SvgjsG1281"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                            <g
                              id="SvgjsG1283"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                            <g
                              id="SvgjsG1285"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                            <g
                              id="SvgjsG1287"
                              classname="apexcharts-bar-goals-groups"
                              className="apexcharts-hidden-element-shown"
                              clipPath="url(#gridRectMarkerMask103ux9gk)"
                            />
                          </g>
                          <g
                            id="SvgjsG1264"
                            className="apexcharts-bar-shadows apexcharts-hidden-element-shown"
                          />
                        </g>
                        <g
                          id="SvgjsG1253"
                          className="apexcharts-datalabels"
                          data:realindex={1}
                        />
                        <g
                          id="SvgjsG1262"
                          className="apexcharts-datalabels apexcharts-hidden-element-shown"
                          data:realindex={0}
                        />
                      </g>
                      <line
                        id="SvgjsLine1304"
                        x1="-18.64397459897128"
                        y1={0}
                        x2="664.9684273633089"
                        y2={0}
                        stroke="#b6b6b6"
                        strokeDasharray={0}
                        strokeWidth={1}
                        strokeLinecap="butt"
                        className="apexcharts-ycrosshairs"
                      />
                      <line
                        id="SvgjsLine1305"
                        x1="-18.64397459897128"
                        y1={0}
                        x2="664.9684273633089"
                        y2={0}
                        strokeDasharray={0}
                        strokeWidth={0}
                        strokeLinecap="butt"
                        className="apexcharts-ycrosshairs-hidden"
                      />
                      <g
                        id="SvgjsG1306"
                        className="apexcharts-xaxis"
                        transform="translate(0, 0)"
                      >
                        <g
                          id="SvgjsG1307"
                          className="apexcharts-xaxis-texts-g"
                          transform="translate(0, -4)"
                        >
                          <text
                            id="SvgjsText1309"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x={0}
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1310">Jan</tspan>
                            <title>Jan</title>
                          </text>
                          <text
                            id="SvgjsText1312"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x="58.75676843312161"
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1313">Feb</tspan>
                            <title>Feb</title>
                          </text>
                          <text
                            id="SvgjsText1315"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x="117.5135368662432"
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1316">Mar</tspan>
                            <title>Mar</title>
                          </text>
                          <text
                            id="SvgjsText1318"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x="176.2703052993648"
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1319">Apr</tspan>
                            <title>Apr</title>
                          </text>
                          <text
                            id="SvgjsText1321"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x="235.02707373248643"
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1322">May</tspan>
                            <title>May</title>
                          </text>
                          <text
                            id="SvgjsText1324"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x="293.783842165608"
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1325">Jun</tspan>
                            <title>Jun</title>
                          </text>
                          <text
                            id="SvgjsText1327"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x="352.5406105987296"
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1328">Jul</tspan>
                            <title>Jul</title>
                          </text>
                          <text
                            id="SvgjsText1330"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x="411.29737903185116"
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1331">Aug</tspan>
                            <title>Aug</title>
                          </text>
                          <text
                            id="SvgjsText1333"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x="470.05414746497274"
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1334">Sep</tspan>
                            <title>Sep</title>
                          </text>
                          <text
                            id="SvgjsText1336"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x="528.8109158980943"
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1337">Oct</tspan>
                            <title>Oct</title>
                          </text>
                          <text
                            id="SvgjsText1339"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x="587.5676843312159"
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1340">Nov</tspan>
                            <title>Nov</title>
                          </text>
                          <text
                            id="SvgjsText1342"
                            fontFamily="Helvetica, Arial, sans-serif"
                            x="646.3244527643375"
                            y="259.99519938278195"
                            textAnchor="middle"
                            dominantBaseline="auto"
                            fontSize="12px"
                            fontWeight={400}
                            fill="#373d3f"
                            className="apexcharts-text apexcharts-xaxis-label "
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                            }}
                          >
                            <tspan id="SvgjsTspan1343">Dec</tspan>
                            <title>Dec</title>
                          </text>
                        </g>
                      </g>
                      <g
                        id="SvgjsG1373"
                        className="apexcharts-yaxis-annotations"
                      />
                      <g
                        id="SvgjsG1374"
                        className="apexcharts-xaxis-annotations"
                      />
                      <g
                        id="SvgjsG1375"
                        className="apexcharts-point-annotations"
                      />
                      <rect
                        id="SvgjsRect1377"
                        width={0}
                        height={0}
                        x={0}
                        y={0}
                        rx={0}
                        ry={0}
                        opacity={1}
                        strokeWidth={0}
                        stroke="none"
                        strokeDasharray={0}
                        fill="#fefefe"
                        className="apexcharts-zoom-rect"
                      />
                      <rect
                        id="SvgjsRect1378"
                        width={0}
                        height={0}
                        x={0}
                        y={0}
                        rx={0}
                        ry={0}
                        opacity={1}
                        strokeWidth={0}
                        stroke="none"
                        strokeDasharray={0}
                        fill="#fefefe"
                        className="apexcharts-selection-rect"
                      />
                    </g>
                  </svg>
                  <div
                    className="apexcharts-tooltip apexcharts-theme-light"
                    style={{ left: "442.173px", top: "81.3483px" }}
                  >
                    <div
                      className="apexcharts-tooltip-title"
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: 12,
                      }}
                    >
                      Oct
                    </div>
                    <div
                      className="apexcharts-tooltip-series-group apexcharts-active"
                      style={{ order: 1, display: "flex" }}
                    >
                      <span
                        className="apexcharts-tooltip-marker"
                        style={{ backgroundColor: "rgb(255, 108, 47)" }}
                      />
                      <div
                        className="apexcharts-tooltip-text"
                        style={{
                          fontFamily: "Helvetica, Arial, sans-serif",
                          fontSize: 12,
                        }}
                      >
                        <div className="apexcharts-tooltip-y-group">
                          <span className="apexcharts-tooltip-text-y-label">
                            Page Views
                          </span>
                          <span className="apexcharts-tooltip-text-y-value">
                            52.0k
                          </span>
                        </div>
                        <div className="apexcharts-tooltip-goals-group">
                          <span className="apexcharts-tooltip-text-goals-label" />
                          <span className="apexcharts-tooltip-text-goals-value" />
                        </div>
                        <div className="apexcharts-tooltip-z-group">
                          <span className="apexcharts-tooltip-text-z-label" />
                          <span className="apexcharts-tooltip-text-z-value" />
                        </div>
                      </div>
                    </div>
                    <div
                      className="apexcharts-tooltip-series-group apexcharts-active"
                      style={{ order: 2, display: "flex" }}
                    >
                      <span
                        className="apexcharts-tooltip-marker"
                        style={{ backgroundColor: "rgb(34, 197, 94)" }}
                      />
                      <div
                        className="apexcharts-tooltip-text"
                        style={{
                          fontFamily: "Helvetica, Arial, sans-serif",
                          fontSize: 12,
                        }}
                      >
                        <div className="apexcharts-tooltip-y-group">
                          <span className="apexcharts-tooltip-text-y-label">
                            Clicks
                          </span>
                          <span className="apexcharts-tooltip-text-y-value">
                            29.0k
                          </span>
                        </div>
                        <div className="apexcharts-tooltip-goals-group">
                          <span className="apexcharts-tooltip-text-goals-label" />
                          <span className="apexcharts-tooltip-text-goals-value" />
                        </div>
                        <div className="apexcharts-tooltip-z-group">
                          <span className="apexcharts-tooltip-text-z-label" />
                          <span className="apexcharts-tooltip-text-z-value" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom apexcharts-theme-light"
                    style={{ left: "568.335px", top: "262.995px" }}
                  >
                    <div
                      className="apexcharts-xaxistooltip-text"
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: 12,
                        minWidth: "18.0562px",
                      }}
                    >
                      Oct
                    </div>
                  </div>
                  <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                    <div className="apexcharts-yaxistooltip-text" />
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* end card body */}
        </div>

        {/* end card */}
      </div>{" "}
    </>
  );
};

export default DashboardPerformance;
