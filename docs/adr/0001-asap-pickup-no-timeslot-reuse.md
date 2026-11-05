# ASAP pickup for Orders, not a reused TimeSlot

Online ordering needed a pickup-timing model. `Booking` already has `TimeSlot`, but its four options are 2-hour dining windows, built for reserving a table — not for "how soon can my takeaway be ready." Reusing it would force Order pickup into windows too coarse to be useful. We decided Orders are ASAP only (prepare now, customer collects whenever ready), with no scheduled slot. If scheduled takeaway pickup times are needed later, that's a new, finer-grained concept — not an extension of `TimeSlot`.
