const recapCard = () => {
    return (
        <div className="p-4 min-w-full">
            <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                    <time
                        dateTime="2022-10-10"
                        className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                    >
                        <span>2022</span>
                        <span className="w-px flex-1 bg-gray-900/10"></span>
                        <span>Oct 10</span>
                    </time>
                </div>
                <img className="aspect-[3/4] md:w-48 md:h-auto md:rounded-none rounded-full " src="https://images.unsplash.com/photo-1687273705305-d8ff89951fdc?q=80&h=5000&w=2454&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <div className="pt-6 md:p-8 space-y-4 ">
                    <blockquote>
                        <p className="text-lg font-medium">
                            Recap Title
                        </p>
                    </blockquote>
                    <figcaption className="font-medium">
                        <div className="text-slate-700 dark:text-slate-500">
                            Recap Description
                        </div>
                    </figcaption>
                </div>
                <div className="flex flex-row justify-self-end">
                    <div className="justify-self-end">
                        Logo
                        <p>0</p>
                    </div>
                    <div className="justify-self-end">
                        Logo
                        <p>0</p>
                    </div>
                </div>
                {/* <span className="w-px ml-2 bg-gray-900/10"></span> */}
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr] justify-self-end">
                    <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
                        <span>Sarah</span>
                        <span className="w-px flex-1 bg-gray-900/10"></span>
                        <span>Dayan</span>
                    </div>
                </div>
            </figure>
        </div>
    );
};

export default recapCard;