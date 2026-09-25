package org.cafe.app.utils;

import net.time4j.PlainDate;
import net.time4j.TemporalType;
import net.time4j.calendar.PersianCalendar;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
public class PersianDateUtil {

    private static final ZoneId TEHRAN = ZoneId.of("Asia/Tehran");

    public static String toPersianDateTime(LocalDateTime dateTime) {
        if (dateTime == null) return "";

        PersianCalendar pc = PlainDate.from(dateTime.toLocalDate())
                .transform(PersianCalendar.class);

        return String.format("%04d/%02d/%02d %02d:%02d:%02d",
                pc.getYear(),
                pc.getMonth().getValue(),
                pc.getDayOfMonth(),
                dateTime.getHour(),
                dateTime.getMinute(),
                dateTime.getSecond());
    }

    public static String toPersianDate(LocalDateTime dateTime) {
        if (dateTime == null) return "";

        PersianCalendar pc = PlainDate.from(dateTime.toLocalDate())
                .transform(PersianCalendar.class);

        return String.format("%04d/%02d/%02d",
                pc.getYear(),
                pc.getMonth().getValue(),
                pc.getDayOfMonth());
    }

    public LocalDateTime getCurrentPersianMonthStart() {
        PersianCalendar persianToday = PlainDate.nowInSystemTime()
                .transform(PersianCalendar.class);

        PersianCalendar firstOfMonth = PersianCalendar.of(
                persianToday.getYear(),
                persianToday.getMonth(),
                1
        );

        PlainDate gregorian = firstOfMonth.transform(PlainDate.class);

        return TemporalType.LOCAL_DATE_TIME.from(gregorian.atStartOfDay());
    }
}