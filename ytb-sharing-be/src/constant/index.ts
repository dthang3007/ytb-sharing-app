export const NOTIFICATION_QUEUE = 'NOTIFICATION_QUEUE';

export const EMIT_NOTI_QUEUE = 'EMIT_NOTI_QUEUE';

export const EVENT_NOTI_SOCKET = 'noti';

export const RGX_LINK_VIDEO_YTB = new RegExp(
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
);

//Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
export const RGX_PASSWORD = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
);

export const MSG_PASSWORD =
  'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';
