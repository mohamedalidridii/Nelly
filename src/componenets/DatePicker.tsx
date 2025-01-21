
import { TRendezVousValidator } from '@/lib/validators/account-credentials-validator';
import { addDays, getDay, setHours, setMinutes, subDays } from 'date-fns';
import React, { forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { RendezVous } from '@/cms-types';
import { trpc } from '@/trpc/client'
import 'react-datepicker/dist/react-datepicker.min.css'
import { Control, ControllerRenderProps } from 'react-hook-form';
interface DatepickProps {
    field: ControllerRenderProps<TRendezVousValidator, 'date'>;
}

const Datepick = forwardRef<HTMLInputElement, DatepickProps>(
    (({ field }, ref) => {

        const [startDate, setStartDate] = useState(new Date().setHours(9, 30),)
        const date = new Date()
        const isWeekday = (date: Date) => {
            const day = getDay(date);
            return day !== 0 && day !== 6;
        };
        const [rendezvousTimes, setRendezvousTimes] = useState<{ [key: string]: Date[] }>({});

        const { data: rendezvousData, isLoading } = trpc.getRendezVous.useQuery();

        useEffect(() => {
            if (rendezvousData) {
                const times: { [key: string]: Date[] } = {};
                (rendezvousData.docs as unknown as RendezVous[]).forEach((rdv) => {
                    const date = new Date(rdv.date);
                    const dateKey = date.toDateString();
                    if (!times[dateKey]) {
                        times[dateKey] = [];
                    }
                    times[dateKey].push(date);
                });
                setRendezvousTimes(times);
                console.log('Fetched RendezVous Times:', times); // Log the fetched times
            }
        }, [rendezvousData]);
        const minTime = new Date(date.setHours(9, 30)); // Set hours to 5 PM with minutes to 0
        const maxTime = new Date(date.setHours(17, 30)); // Set hours to 8:30 PM with minutes to 30

        const filterPassedTime = (time: Date) => {
            const currentDate = new Date();
            const selectedDate = new Date(time);

            return currentDate.getTime() < selectedDate.getTime();
        };
        const filterTimes = (date: Date) => {
            const dateKey = date.toDateString();
            return rendezvousTimes[dateKey] || [];
        };
        return (
            <div className="relative px-1" ref={ref}>
                <DatePicker
                    wrapperClassName='input-attribute'
                    className='bg-white appearance-none px-4 py-4 rounded-lg shadow border-black text-black'
                    showIcon
                    withPortal
                    showTimeSelect
                    selected={field.value ? new Date(field.value) : null}
                    name={field.name}
                    filterDate={isWeekday}
                    filterTime={filterPassedTime}
                    onChange={(date) => field.onChange(date)}
                    onBlur={field.onBlur}
                    timeIntervals={60}
                    monthsShown={1}
                    minDate={subDays(new Date(), 0)}
                    maxDate={addDays(new Date(), 30)}
                    timeFormat="p"
                    toggleCalendarOnIconClick
                    calendarStartDay={1}
                    minTime={setHours(setMinutes(new Date(), 0), 8)}
                    maxTime={setHours(setMinutes(new Date(), 0), 17)}
                    placeholderText='Date Rendez-vous'
                    dateFormat="dd/MM/yyyy h:mm aa"
                    excludeTimes={filterTimes(field.value ? new Date(field.value) : new Date())}
                />
                <i className="fas fa-calendar absolute top-1/4 right-4 text-black"></i>
            </div>
        )


    }));
Datepick.displayName = "Datepick";

export default Datepick;    