import { notFound } from "next/navigation"
import "./lecturer.css"
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Form from "@/components/form/form"
import { Button } from "../ui/button"
import { getTimeSlot } from "@/lib/db"
  
export default function Lecturer({ data }: { data: any }){
    if (!data.first_name) return notFound()

    const tags = data.tags || []
    const tagsString = tags.map((tag: { name: string; uuid: string }) => tag.name).join(', ');

    const contact = data.contact || {};
    const phones = contact.telephone_numbers || [];

    const emails = contact.emails || [];

    const submit = async (formData: FormData) =>{
        "use server"
        const first_name = formData.get("first_name");
        const last_name = formData.get("last_name");
        const email = formData.get("email");
        const form = formData.get("form");
        const date = formData.get("day");
        let formatedDate;
        if (date) {
            formatedDate = new Date(date.toString().replace(/(\d{2})\w{2},/, '$1,'));
            formatedDate.setUTCDate(formatedDate.getUTCDate() + 1);
            formatedDate.setUTCHours(0, 0, 0, 0);
            formatedDate = formatedDate.toISOString();
        }
        const timeSlot = await getTimeSlot("2024-02-24T00:00:00.000Z", "36906f6f-a5b9-4be1-95f1-48851f63ced1");
        console.log(timeSlot)
      }

    return (
        <div className="lecturer">
            <a href="/lecturers"><div className="lecturer-back"><img src="/arrow-3.svg"/>Zpět</div></a>
            <h1>Naši lektoři</h1>
            <div className="lecturer-more">
                <div className="lecturer-img">
                    <img src={data.picture_url} alt="Učitel obrázek"></img>
                </div>
                <div className="lecturer-info">
                    <div className="lecturer-location">
                        <span>{data.location}</span>
                    </div>
                    <div className="lecturer-name">
                        <h2>{data.title_before} {data.first_name} {data.middle_name} {data.last_name} {data.title_after}</h2>
                    </div>
                    <div className="lecturer-claim">
                        <h3 dangerouslySetInnerHTML={{ __html: data.claim }}></h3>
                    </div>
                    <div className="lecturer-bio">
                        <p dangerouslySetInnerHTML={{ __html: data.bio }}></p>
                    </div>
                    <div className="lecturer-tags">
                        <div className="lecturer-tag">
                            <img src="/cash.png"/>
                            <span>Kč{data.price_per_hour}/hod</span>
                        </div>
                        <div className="lecturer-tag">
                            <img src="/tags.png"/>
                            {tagsString && <span>{tagsString}</span>}
                        </div>
                        <div className="lecturer-tag">
                            <img src="/call.png"/>
                            <span>{phones}</span>
                        </div>
                        <div className="lecturer-tag">
                            <img src="/email.png"/>
                            <span>{emails}</span>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger className="w-max">Domluvit si schůzku</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Objednávka hodiny - {data.first_name} {data.last_name}</DialogTitle>
                            </DialogHeader>
                            <form action={submit}>
                                <Form data={data}/>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="submit">Odeslat</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
  }
  