import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeIcons, toggleIcons } from "../../Radux/IconsViewSlice";
import SidebarItem from "./SidebarItem";
import Dropdown from "./Dropdown";

export const SideBar = () => {
  const dispatch = useDispatch();
  const { isOpen: openIcons } = useSelector((state) => state.iconsView);

  const sidebarRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        dispatch(closeIcons());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);
  return (
    <aside
      ref={sidebarRef}
      className={`hidden fixed top-10 left-0 z-20 h-full pt-16 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:flex flex-col transition-all duration-300 ease-in-out ${openIcons ? "w-64" : "w-22 "}`}
    >
      <button
        onClick={() => dispatch(toggleIcons())}
        className="flex items-center justify-center w-10 h-10 mt-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 mx-auto"
      >
        {openIcons ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 640 640">
            <path d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C221.6 240.4 221.6 255.6 231 264.9L286 319.9L231 374.9C221.6 384.3 221.6 399.5 231 408.8C240.4 418.1 255.6 418.2 264.9 408.8L319.9 353.8L374.9 408.8C384.3 418.2 399.5 418.2 408.8 408.8C418.1 399.4 418.2 384.2 408.8 374.9L353.8 319.9L408.8 264.9C418.2 255.5 418.2 240.3 408.8 231C399.4 221.7 384.2 221.6 374.9 231L319.9 286L264.9 231C255.5 221.6 240.3 221.6 231 231z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 640 640">
            <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
          </svg>
        )}
      </button>
      <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col flex-1 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 space-y-2 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {/* pages */}

            <ul className="flex-1 px-3 space-y-2 p-2 ">
              <SidebarItem
                href="/"
                icon="M544.4 304L368.4 304C350.7 304 336.4 289.7 336.4 272L336.4 96C336.4 78.3 350.8 63.8 368.3 66.1C475.3 80.3 560.1 165.1 574.3 272.1C576.6 289.6 562.1 304 544.4 304zM254.6 101.2C272.7 97.4 288.4 112.2 288.4 130.7L288.4 328C288.4 333.6 290.4 339 293.9 343.3L426 502.7C437.7 516.8 435.2 538.1 419.1 546.8C385 565.4 345.9 576 304.4 576C171.9 576 64.4 468.5 64.4 336C64.4 220.5 145.9 124.1 254.6 101.2zM509.8 352L573.8 352C592.3 352 607.1 367.7 603.3 385.8C593.1 434.2 568.3 477.2 533.7 510C521.4 521.7 502.1 519.2 491.3 506.1L406.9 404.4C389.6 383.5 404.5 352 431.5 352L509.7 352z"
                title="Dashboard"
                openicons={openIcons}
              />

              <SidebarItem
                href="/users"
                icon="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z"
                icon2=""
                title="Users"
                openicons={openIcons}
              />
              <SidebarItem
                href="/products"
                icon="M64 64C46.3 64 32 78.3 32 96C32 113.7 46.3 128 64 128L136.9 128L229 404.2C206.5 421.8 192 449.2 192 480C192 533 235 576 288 576C340.4 576 383.1 534 384 481.7L586.1 414.3C602.9 408.7 611.9 390.6 606.3 373.8C600.7 357 582.6 348 565.8 353.6L363.8 421C346.6 398.9 319.9 384.5 289.8 384L197.7 107.8C188.9 81.6 164.5 64 136.9 64L64 64zM240 480C240 453.5 261.5 432 288 432C314.5 432 336 453.5 336 480C336 506.5 314.5 528 288 528C261.5 528 240 506.5 240 480zM312.5 153.3C287.3 161.5 273.5 188.6 281.7 213.8L321.3 335.5C329.5 360.7 356.6 374.5 381.8 366.3L503.5 326.7C528.7 318.5 542.5 291.4 534.3 266.2L494.8 144.5C486.6 119.3 459.5 105.5 434.3 113.7L312.5 153.3z"
                title="Products"
                openicons={openIcons}
              />

              <SidebarItem
                href="/orders"
                icon="M432 96C387.8 96 352 131.8 352 176L352 424.2L54.8 513.4C37.9 518.4 28.3 536.3 33.4 553.2C38.5 570.1 56.3 579.7 73.2 574.7L388.7 480.1L432.4 480.1C432.2 482.7 432 485.4 432 488.1C432 536.7 471.4 576.1 520 576.1C568.6 576.1 608 536.7 608 488.1L608 96.1L432 96.1zM560 488C560 510.1 542.1 528 520 528C497.9 528 480 510.1 480 488C480 465.9 497.9 448 520 448C542.1 448 559.9 465.9 560 487.9L560 488zM83.9 213.5C50.1 223.8 31.1 259.6 41.4 293.4L69.5 385.2C79.8 419 115.6 438 149.4 427.7L241.2 399.6C275 389.3 294 353.5 283.7 319.7L255.6 227.9C245.3 194.1 209.5 175.1 175.7 185.4L83.9 213.5z"
                icon2=""
                title="Orders"
                openicons={openIcons}
              />
              {/* <Dropdown
                title="Setting"
                icon="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"
                open={openDropdown === "reports"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "reports" ? null : "reports")
                }
                items={[
                  { href: "/crud/products", title: "Products" },
                  { href: "/crud/users", title: "Users" },
                ]}
              /> */}
            </ul>
          </div>
          {openIcons && (
            <div
              className={`
                              relative mx-auto mr-2 mb-8 w-60
                              rounded-xl
                              border border-gray-300/60 dark:border-blue-800/60
                              bg-linear-to-br
                              from-gray-400 to-gray-300
                              dark:from-blue-950 dark:to-blue-900
                              p-4
                              text-black dark:text-slate-100
                              shadow-md
                              transition-opacity duration-300 ${openIcons ? "opacity-100" : "opacity-0 pointer-events-none"}
                            `}
              role="alert"
            >
              {/* Header */}
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z" />
                  </svg>
                </span>
                <h3 className="font-semibold ">Beta Version</h3>
              </div>

              {/* Content */}
              <p className="mb-4 text-sm leading-relaxed ">
                Preview the new navigation experience. You can turn it off
                anytime from your profile settings.
              </p>

              {/* Action */}
              <button
                type="button"
                className="inline-flex items-center rounded-md dark:bg-blue-600 bg-gray-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Turn off
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
