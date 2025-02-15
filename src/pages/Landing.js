import { faClipboard, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react"
import { Link } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import Header from "../components/Header";


export default function Landing() {

    return (
        <>
            <Header/>
            <main class="flex-1">
                <section class="topsection sm:h-screen overflow-hidden py-16 md:py-24 lg:py-32 xl:py-48 relative">
                    <div class="container mx-auto px-4 md:px-6 lg:px-12">
                        <img class="absolute inset-0 w-full h-full object-cover z-[-1]" src="landing-preview.jpg" alt="Landing Preview" />

                        <div class="flex flex-col items-center justify-center h-full space-y-4 text-center">
                            <div class="space-y-2">
                                <h1 class="font-bold tracking-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white">
                                    Your Daily Essentials
                                </h1>
                                <p class="mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-slate-500 max-w-md md:max-w-lg lg:max-w-2xl">
                                    Streamline your Sprint processes, boost team productivity, and deliver projects faster with our intuitive toolkit designed for Scrum Masters.
                                </p>
                            </div>
                            <div>
                                <a href="/register" class="bg-indigo-900 px-6 py-2 rounded-full text-white hover:bg-indigo-600 transition-all">
                                    Get Started
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="bg-white py-16 md:py-24 lg:py-32">
                    <div class="container mx-auto px-4 md:px-6 lg:px-12">
                        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold text-slate-900 mb-12">
                            Key Features
                        </h2>
                        <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                            <div class="flex flex-col items-center space-y-3 text-center">
                                <FontAwesomeIcon icon={faClipboard} class="h-10 text-emerald-800" />
                                <h3 class="text-lg md:text-xl font-semibold text-slate-900">Intuitive Dashboard</h3>
                                <p class="text-sm text-slate-700">
                                    Get a bird's-eye view of your projects with our easy-to-use dashboard.
                                </p>
                            </div>
                            <div class="flex flex-col items-center space-y-3 text-center">
                                <FontAwesomeIcon icon={faPenToSquare} class="h-10 text-emerald-800" />
                                <h3 class="text-lg md:text-xl font-semibold text-slate-900">Sprint Planning</h3>
                                <p class="text-sm text-slate-700">
                                    Plan and manage sprints effortlessly with our drag-and-drop interface.
                                </p>
                            </div>
                            <div class="flex flex-col items-center space-y-3 text-center">
                                <FontAwesomeIcon icon={faUsers} class="h-10 text-emerald-800" />
                                <h3 class="text-lg md:text-xl font-semibold text-slate-900">Team Collaboration</h3>
                                <p class="text-sm text-slate-700">
                                    Foster teamwork with real-time updates and communication tools.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="bg-black py-12 md:py-24 lg:py-32">
                    <div class="container mx-auto px-4 md:px-6 lg:px-12">
                        <div class="flex flex-col items-center space-y-6 text-center">
                            <div class="space-y-3">
                                <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                                    Ready to Elevate Your Scrum Mastery?
                                </h2>
                                <p class="mx-auto max-w-md sm:max-w-lg lg:max-w-xl text-slate-400 text-sm md:text-base">
                                    Join thousands of Scrum Masters already using our toolkit to lead high-performing agile teams and deliver successful projects.
                                </p>
                            </div>
                            <div class="w-full max-w-md">
                                <form class="flex flex-wrap space-x-2">
                                    <input
                                        class="flex-1 bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2"
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                    <button
                                        type="submit"
                                        class="bg-indigo-900 text-white px-6 py-2 rounded-md hover:bg-indigo-600"
                                    >
                                        Get Started
                                    </button>
                                </form>
                                <p class="text-xs text-slate-500 mt-2">
                                    Start your free 14-day trial. No credit card required.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


        </>

        // <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
        //     <header className="px-4 lg:px-6 h-14 flex items-center border-b border-slate-200 dark:border-slate-800">
        //         <Link className="flex items-center justify-center" href="#">
        //             <Vote className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        //             <span className="ml-2 text-xl font-bold text-slate-900 dark:text-slate-100">APM</span>
        //         </Link>
        //         <nav className="ml-auto flex gap-4 sm:gap-6">
        //             <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="#">
        //                 Features
        //             </Link>

        //             <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="#">
        //                 About
        //             </Link>
        //             <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" href="#">
        //                 Contact
        //             </Link>
        //         </nav>
        //     </header>
        //     <main className="flex-1">
        //         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-slate-800">
        //             <div className="container px-4 md:px-6">
        //                 <div className="flex flex-col items-center space-y-4 text-center">
        //                     <div className="space-y-2">
        //                         <h1 className="text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-slate-900 dark:text-slate-100">
        //                             Scrum Master's Toolkit
        //                         </h1>
        //                         <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl dark:text-slate-400">
        //                             Streamline your Scrum processes, boost team productivity, and deliver projects faster with our intuitive toolkit designed for Scrum Masters.
        //                         </p>
        //                     </div>
        //                     <div className="space-x-4">
        //                         <Button className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">
        //                             Get Started
        //                         </Button>
        //                         <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950">
        //                             Learn more
        //                         </Button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </section>
        //         <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50 dark:bg-slate-800">
        //             <div className="container px-4 md:px-6">
        //                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-slate-900 dark:text-slate-100">Key Features</h2>
        //                 <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        //                     <div className="flex flex-col items-center space-y-3 text-center">
        //                         <LayoutDashboard className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
        //                         <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Intuitive Dashboard</h3>
        //                         <p className="text-sm text-slate-500 dark:text-slate-400">
        //                             Get a bird's-eye view of your projects with our easy-to-use dashboard.
        //                         </p>
        //                     </div>
        //                     <div className="flex flex-col items-center space-y-3 text-center">
        //                         <RefreshCcw className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
        //                         <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Sprint Planning</h3>
        //                         <p className="text-sm text-slate-500 dark:text-slate-400">
        //                             Plan and manage sprints effortlessly with our drag-and-drop interface.
        //                         </p>
        //                     </div>
        //                     <div className="flex flex-col items-center space-y-3 text-center">
        //                         <Users className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
        //                         <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Team Collaboration</h3>
        //                         <p className="text-sm text-slate-500 dark:text-slate-400">
        //                             Foster teamwork with real-time updates and communication tools.
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </section>
        //         <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-slate-900">
        //             <div className="container px-4 md:px-6">
        //                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-slate-900 dark:text-slate-100">What Scrum Masters Say</h2>
        //                 <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        //                     <div className="flex flex-col items-center space-y-3 text-center">
        //                         <Image
        //                             src="/placeholder.svg?height=100&width=100"
        //                             alt="User Avatar"
        //                             className="rounded-full"
        //                             width={100}
        //                             height={100}
        //                         />
        //                         <p className="text-sm text-slate-500 dark:text-slate-400">
        //                             "This tool has revolutionized our project management process. We're more efficient than ever!"
        //                         </p>
        //                         <p className="font-semibold text-slate-900 dark:text-slate-100">- Sarah J., Product Manager</p>
        //                     </div>
        //                     <div className="flex flex-col items-center space-y-3 text-center">
        //                         <Image
        //                             src="/placeholder.svg?height=100&width=100"
        //                             alt="User Avatar"
        //                             className="rounded-full"
        //                             width={100}
        //                             height={100}
        //                         />
        //                         <p className="text-sm text-slate-500 dark:text-slate-400">
        //                             "The sprint planning feature is a game-changer. Our team loves how easy it is to use."
        //                         </p>
        //                         <p className="font-semibold text-slate-900 dark:text-slate-100">- Mike T., Scrum Master</p>
        //                     </div>
        //                     <div className="flex flex-col items-center space-y-3 text-center">
        //                         <Image
        //                             src="/placeholder.svg?height=100&width=100"
        //                             alt="User Avatar"
        //                             className="rounded-full"
        //                             width={100}
        //                             height={100}
        //                         />
        //                         <p className="text-sm text-slate-500 dark:text-slate-400">
        //                             "We've seen a 30% increase in productivity since implementing this agile project management tool."
        //                         </p>
        //                         <p className="font-semibold text-slate-900 dark:text-slate-100">- Emily R., CTO</p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </section>
        //         <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50 dark:bg-slate-800">
        //             <div className="container px-4 md:px-6">
        //                 <div className="flex flex-col items-center space-y-4 text-center">
        //                     <div className="space-y-2">
        //                         <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-slate-100">Ready to Elevate Your Scrum Mastery?</h2>
        //                         <p className="mx-auto max-w-[600px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
        //                             Join thousands of Scrum Masters already using our toolkit to lead high-performing agile teams and deliver successful projects.
        //                         </p>
        //                     </div>
        //                     <div className="w-full max-w-sm space-y-2">
        //                         <form className="flex space-x-2">
        //                             <Input
        //                                 className="max-w-lg flex-1 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
        //                                 placeholder="Enter your email"
        //                                 type="email"
        //                             />
        //                             <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">
        //                                 Get Started
        //                                 <ArrowRight className="ml-2 h-4 w-4" />
        //                             </Button>
        //                         </form>
        //                         <p className="text-xs text-slate-500 dark:text-slate-400">
        //                             Start your free 14-day trial. No credit card required.
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </section>
        //     </main>
        //     <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-200 dark:border-slate-800">
        //         <p className="text-xs text-slate-500 dark:text-slate-400">© 2024 APM. All rights reserved.</p>
        //         <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        //             <Link className="text-xs hover:underline underline-offset-4 text-slate-500 dark:text-slate-400" href="#">
        //                 Terms of Service
        //             </Link>
        //             <Link className="text-xs hover:underline underline-offset-4 text-slate-500 dark:text-slate-400" href="#">
        //                 Privacy
        //             </Link>
        //         </nav>
        //     </footer>
        // </div>

    )
}

