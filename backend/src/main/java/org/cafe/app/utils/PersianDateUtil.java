package org.cafe.app.utils;

import com.ibm.icu.util.ULocale;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

@Component
public class PersianDateUtil {

    private static final Locale PERSIAN_LOCALE = new Locale.Builder()
            .setLanguage("fa")
            .setRegion("IR")
            .build();

    private static final DateTimeFormatter PERSIAN_DATE_TIME_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")
                    .withLocale(PERSIAN_LOCALE);

    private static final DateTimeFormatter PERSIAN_DATE_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy/MM/dd")
                    .withLocale(PERSIAN_LOCALE);

    public static String toPersianDateTime(LocalDateTime dateTime) {
        if (dateTime == null) return "";
        return dateTime.format(PERSIAN_DATE_TIME_FORMATTER);
    }

    public static String toPersianDate(LocalDateTime dateTime) {
        if (dateTime == null) return "";
        return dateTime.format(PERSIAN_DATE_FORMATTER);
    }

    public LocalDateTime getCurrentPersianMonthStart() {
        Calendar persianCalendar = Calendar.getInstance(
                TimeZone.getTimeZone("Asia/Tehran"),
                ULocale.forLanguageTag("fa-IR").toLocale()
        );

        int year = persianCalendar.get(Calendar.YEAR);
        int month = persianCalendar.get(Calendar.MONTH);

        Calendar startOfMonth = Calendar.getInstance(
                TimeZone.getTimeZone("Asia/Tehran"),
                ULocale.forLanguageTag("fa-IR").toLocale()
        );
        startOfMonth.clear();
        startOfMonth.set(year, month, 1, 0, 0, 0);

        return LocalDateTime.of(
                startOfMonth.get(Calendar.YEAR),
                startOfMonth.get(Calendar.MONTH) + 1,
                startOfMonth.get(Calendar.DAY_OF_MONTH),
                0, 0, 0
        );
    }
}