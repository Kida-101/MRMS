const page = () => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/80" />
        <div className="aspect-video rounded-xl bg-muted/80"></div>
        <div className="aspect-video rounded-xl bg-muted/80" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/80 md:min-h-min" />
    </div>
  );
};

export default page;
