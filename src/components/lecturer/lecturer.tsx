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
import {addReservation, getReservations} from "@/lib/db";

export default function Lecturer({ data }: { data: any }){
    if (!data.first_name) return notFound()

    const uuid = data.uuid;

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
        const timeSlot = formData.get("timeSlot");
        const phone_number = formData.get("phone_number");
        const message = formData.get("message");
        let formatedDate;
        if (date) {
            const parts = date.toString().split('/');
            const month = parseInt(parts[0], 10);
            const day = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            const parsedDate = new Date(year, month - 1, day + 1);
            parsedDate.setUTCHours(0, 0, 0, 0);
            formatedDate = parsedDate.toISOString();
        }
        const data = {lecturer_uuid: uuid,first_name: first_name, last_name: last_name, email: email, form: form, date: formatedDate, timeSlot: timeSlot, phone_number: phone_number, message: message};
        await addReservation(data);
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
                        <div className="lecturer-reservation">
                            <DialogTrigger className="w-max">Domluvit si schůzku</DialogTrigger>
                        </div>
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
  