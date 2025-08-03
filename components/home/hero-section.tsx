"use client";

export default function HeroSection() {
  return (
    <section
      data-bp-location="header"
      id="conheça-o-vaza-ai"
      className="container-v3 w-full bg-container-background black overflow-visible"
    >
      <div className="container-inner grid grid-cols-25 mx-auto w-full max-w-screen-2xl auto-rows-auto md:gap-y-8 pt-component pb-component">
        <div
          className="w-full grid grid-cols-23 z-0 text-hero-left-content [&>*]:text-left grid-rows-[1fr_auto] gap-y-4 md:gap-y-10 md:relative md:min-h-[41rem] black [&>*:first-child]:md:pt-16 [&>.cta-list]:md:pb-16 col-span-23 col-start-2 row-start-1"
          style={{ "--aspect-ratio": "16/9" } as React.CSSProperties}
        >
          <div className="row-[1_/_span_1] col-[2_/_span_21] flex flex-col gap-4 justify-end pointer-events-none md:min-h-[unset] [&>*:last-child]:pb-14 min-h-[41.875rem] md:!col-[2_/_span_13] md:[&>*:last-child]:pb-0">
            <h1 className="w-full md:w-auto text-display-mobile-4.5 text-display-3 md:text-display-2 break-auto pointer-events-auto text-white">
              Discover the Vaza AI
            </h1>
            <div className="text-body-1 md:text-hero-left-sub-content w-full whitespace-pre-line md:pb-0 md:w-[calc((8/13)*100%)] pointer-events-auto text-white [&_p+p]:mt-4 [&_p]:leading-[1.58] [&_p]:max-w-[100%] [&_p]:whitespace-pre-wrap [&_ul]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-y-3 [&_ul]:pl-[1.5em] [&_ul]:ml-[calc((1/25)*clamp(var(--screen-xs),_100vw,_var(--screen-2xl)))] [&_a]:underline [&_a]:text-hyperlink [&_a]:font-medium hover:[&_a]:text-hyperlink-hover [&_ol]:list-decimal [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-3 [&_ol]:pl-[1.5em] [&_ol]:ml-[calc((1/25)*clamp(var(--screen-xs),_100vw,_var(--screen-2xl)))]">
              <p>
                Discover countries, understand visa requirements and plan your
                next adventure with artificial intelligence that simplifies the
                entire travel process.
              </p>
            </div>
          </div>
          <div className="row-[2_/_span_1] flex flex-col gap-4 md:flex-row md:justify-between md:col-[2_/_span_21] col-[1_/_span_22] pb-16">
            <ul className="cta-list flex flex-col gap-2 md:flex-row h-fit">
              <li>
                <a
                  href="/dashboard/get-started"
                  className="box-border button bg-transparent border-none no-underline blue group p-0 w-full text-left"
                >
                  <span className="cursor-pointer w-full md:w-auto button-inner max-w-full border-0 p-0 inline-flex items-center justify-between font-sans font-medium no-underline rounded-xl relative overflow-hidden gap-4 z-0 group-focus-within:outline-btn-focus-outline before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:bg-btn-background before:transition-all motion-reduce:before:transition-none before:delay-0 before:duration-0 before:-z-20 after:content-[''] after:absolute after:left-full after:top-0 after:h-full after:w-full after:rounded-xl after:border after:border-btn-hover-background after:bg-btn-hover-background after:transition-all motion-reduce:after:transition-none after:ease-in-out after:duration-350 after:-z-10 py-3.5 px-5 text-body-2 group-hover:before:bg-btn-hover-background group-hover:before:delay-350 group-hover:after:left-0">
                    <span className="button-title leading-body-1 font-medium text-btn-content transition-all motion-reduce:transition-none ease-in-out duration-500 group-hover:text-btn-hover-content">
                      Get Started
                    </span>
                    <span className="button-icon-container overflow-hidden flex justify-start transition-all motion-reduce:transition-none duration-500 ease-in-out gap-3 py-1 px-3.5 rounded-md w-12 bg-btn-icon-container group-hover:bg-btn-hover-icon-container group-focus-within:bg-btn-hover-icon-container">
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 fill-btn-hover-content transition-all motion-reduce:transition-none duration-500 ease-in-out group-hover:ml-0 -ml-8 mr-0"
                      >
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 mx-0 fill-btn-content"
                      >
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/plan"
                  className="box-border button bg-transparent border-none no-underline dark-gray group p-0 w-full text-left"
                >
                  <span className="cursor-pointer w-full md:w-auto button-inner max-w-full border-0 p-0 inline-flex items-center justify-between font-sans font-medium no-underline rounded-xl relative overflow-hidden gap-4 z-0 group-focus-within:outline-btn-focus-outline before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:bg-btn-background before:transition-all motion-reduce:before:transition-none before:delay-0 before:duration-0 before:-z-20 after:content-[''] after:absolute after:left-full after:top-0 after:h-full after:w-full after:rounded-xl after:border after:border-btn-hover-background after:bg-btn-hover-background after:transition-all motion-reduce:after:transition-none after:ease-in-out after:duration-350 after:-z-10 py-3.5 px-5 text-body-2 group-hover:before:bg-btn-hover-background group-hover:before:delay-350 group-hover:after:left-0">
                    <span className="button-title leading-body-1 font-medium text-btn-content transition-all motion-reduce:transition-none ease-in-out duration-500 group-hover:text-btn-hover-content">
                      Plan Trip
                    </span>
                    <span className="button-icon-container overflow-hidden flex justify-start transition-all motion-reduce:transition-none duration-500 ease-in-out gap-3 py-1 px-3.5 rounded-md w-12 bg-btn-icon-container group-hover:bg-btn-hover-icon-container group-focus-within:bg-btn-hover-icon-container">
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 fill-btn-hover-content transition-all motion-reduce:transition-none duration-500 ease-in-out group-hover:ml-0 -ml-8 mr-0"
                      >
                        <use href="/extracted-icons/icon-62.svg#icon-62"></use>
                      </svg>
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 mx-0 fill-btn-content"
                      >
                        <use href="/extracted-icons/icon-63.svg#icon-63"></use>
                      </svg>
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full h-full rounded-2xl md:rounded-standard -z-[1] col-[1_/_span_23] p-0 md:absolute md:w-full md:h-full row-[1_/_span_1] md:row-[1_/_span_2]">
            <div className="w-full h-full relative hidden md:block z-0">
              <img
                src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Mapa mundial e destinos"
                className="relative z-[1] w-full h-full rounded-2xl md:rounded-standard object-cover"
              />
            </div>
            <div className="w-full h-full relative block md:hidden z-0">
              <img
                src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Mapa mundial e destinos"
                className="relative z-[1] w-full h-full rounded-2xl md:rounded-standard object-cover"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-20 md:gap-x-4 md:gap-y-0 md:auto-rows-fr md:content-stretch md:grid-cols-2 lg:grid-cols-4 col-[1/-1] md:col-[2/-2] [&>div>div]:h-full">
          <div className="no-underline w-full h-full font-sans overflow-hidden">
            <div className="text-card-content flex flex-col rounded-standard md:rounded-standard w-full h-full transition-all duration-500 ease-in-out black p-6 bg-card-background">
              <h2 className="flex overflow-visible mb-component-1/3 text-display-mobile-6 md:text-display-7 break-auto">
                Discover Countries
              </h2>
              <div className="text-card-sub-content flex text-body-2 md:flex-grow [&_ul]:gap-2 [&_a]:text-generic-card-hyperlink text-card-sub-content [&_p+p]:mt-4 [&_p]:leading-[1.58] [&_p]:max-w-[100%] [&_p]:whitespace-pre-wrap [&_ul]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-y-3 [&_ul]:pl-[1.5em] [&_ul]:ml-[calc((1/25)*clamp(var(--screen-xs),_100vw,_var(--screen-2xl)))] [&_a]:underline [&_a]:text-hyperlink [&_a]:font-medium hover:[&_a]:text-hyperlink-hover [&_ol]:list-decimal [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-3 [&_ol]:pl-[1.5em] [&_ol]:ml-[calc((1/25)*clamp(var(--screen-xs),_100vw,_var(--screen-2xl)))]">
                <p>
                  Explore amazing destinations and discover detailed information
                  about culture, climate, cost of living and tourist attractions
                  from any country in the world.
                </p>
              </div>
            </div>
          </div>
          <div className="no-underline w-full h-full font-sans overflow-hidden">
            <div className="text-card-content flex flex-col rounded-standard md:rounded-standard w-full h-full transition-all duration-500 ease-in-out black p-6 bg-card-background">
              <h2 className="flex overflow-visible mb-component-1/3 text-display-mobile-6 md:text-display-7 break-auto">
                Visa Types
              </h2>
              <div className="text-card-sub-content flex text-body-2 md:flex-grow [&_ol]:list-decimal [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-6 [&_ol]:ml-10 [&_ul]:ml-10 [&_ul]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_a]:underline [&_a]:text-generic-card-hyperlink [&_a]:font-medium text-card-sub-content [&_p+p]:mt-4 [&_p]:leading-[1.58] [&_p]:max-w-[100%] [&_p]:whitespace-pre-wrap [&_ul]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-y-3 [&_ul]:pl-[1.5em] [&_ul]:ml-[calc((1/25)*clamp(var(--screen-xs),_100vw,_var(--screen-2xl)))] [&_a]:underline [&_a]:text-hyperlink [&_a]:font-medium hover:[&_a]:text-hyperlink-hover [&_ol]:list-decimal [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-3 [&_ol]:pl-[1.5em] [&_ol]:ml-[calc((1/25)*clamp(var(--screen-xs),_100vw,_var(--screen-2xl)))]">
                <p>
                  Understand the different types of visas available, specific
                  requirements and application processes for each destination
                  country.
                </p>
              </div>
            </div>
          </div>
          <div className="no-underline w-full h-full font-sans overflow-hidden">
            <div className="text-card-content flex flex-col rounded-standard md:rounded-standard w-full h-full transition-all duration-500 ease-in-out black p-6 bg-card-background">
              <h2 className="flex overflow-visible mb-component-1/3 text-display-mobile-6 md:text-display-7 break-auto">
                Required Documents
              </h2>
              <div className="text-card-sub-content flex text-body-2 md:flex-grow [&_ul]:gap-2 [&_a]:text-generic-card-hyperlink text-card-sub-content [&_p+p]:mt-4 [&_p]:leading-[1.58] [&_p]:max-w-[100%] [&_p]:whitespace-pre-wrap [&_ul]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-y-3 [&_ul]:pl-[1.5em] [&_ul]:ml-[calc((1/25)*clamp(var(--screen-xs),_100vw,_var(--screen-2xl)))] [&_a]:underline [&_a]:text-hyperlink [&_a]:font-medium hover:[&_a]:text-hyperlink-hover [&_ol]:list-decimal [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-3 [&_ol]:pl-[1.5em] [&_ol]:ml-[calc((1/25)*clamp(var(--screen-xs),_100vw,_var(--screen-2xl)))]">
                <p>
                  Get a personalized list of documents needed for your trip,
                  with specific guidance for each type of visa and destination.
                </p>
              </div>
            </div>
          </div>
          <div className="no-underline w-full h-full font-sans overflow-hidden">
            <div className="text-card-content flex flex-col rounded-standard md:rounded-standard w-full h-full transition-all duration-500 ease-in-out black p-6 bg-card-background">
              <h2 className="flex overflow-visible mb-component-1/3 text-display-mobile-6 md:text-display-7 break-auto">
                Personalized AI
              </h2>
              <div className="text-card-sub-content flex text-body-2 md:flex-grow [&_ul]:gap-2 [&_a]:text-generic-card-hyperlink text-card-sub-content [&_p+p]:mt-4 [&_p]:leading-[1.58] [&_p]:max-w-[100%] [&_p]:whitespace-pre-wrap [&_ul]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-y-3 [&_ul]:pl-[1.5em] [&_ul]:ml-[calc((1/25)*clamp(var(--screen-xs),_100vw,_var(--screen-2xl)))] [&_a]:underline [&_a]:text-hyperlink [&_a]:font-medium hover:[&_a]:text-hyperlink-hover [&_ol]:list-decimal [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-3 [&_ol]:pl-[1.5em] [&_ol]:ml-[calc((1/25)*clamp(var(--screen-xs),_100vw,_var(--screen-2xl)))]">
                <p>
                  Our AI analyzes your profile and goals to provide personalized
                  recommendations about destinations, visas and travel planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
