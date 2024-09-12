import { BACKEND_T_teams } from "@/types/backend";
import { uid } from "./uid";

export const getTracksFromMembers = (
  members: BACKEND_T_teams["member"],
  requirement: BACKEND_T_teams["requirement"],
) => {
  const tracks = [
    ...members.map((member) => member.myTrack.map((item) => item.name)),
    ...requirement.map((item) => item.name),
  ]
    .flat()
    .sort();

  const map = new Map();
  tracks.forEach((element, index) => {
    map.set(element, {
      id: uid(),
      name: element,
      maxmembers: map.has(element) ? map.get(element).maxmembers + 1 : 1,
      members: [
        ...(map.has(element) ? map.get(element).members : []),
        {
          id: uid(),
          name: members[index]?.user.fullName || "",
          imageURL: "",
        },
      ],
    });
  });

  return Array.from(map.values());
};
