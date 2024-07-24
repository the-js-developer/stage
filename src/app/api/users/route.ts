import { NextResponse } from "next/server";
import { UserData } from "../../../utils/types";

export async function GET() {
    const data: UserData[] = [{
        id: '1',
        insta_handle: 'mono_repo',
        img: 'images/person.svg'
    },
    {
        id: '2',
        insta_handle: 'micro_service_http_you',
        img: 'images/person.svg'
    },
    {
        id: '3',
        insta_handle: 'git_hub',
        img: 'images/person.svg'
    },
    {
        id: '4',
        insta_handle: 'telemetry',
        img: 'images/person.svg'
    },
    {
        id: '5',
        insta_handle: 'telemetry',
        img: 'images/person.svg'
    },
    {
        id: '6',
        insta_handle: 'telemetry',
        img: 'images/person.svg'
    },
    {
        id: '7',
        insta_handle: 'telemetry',
        img: 'images/person.svg'
    }];
    return NextResponse.json({ data })
  }