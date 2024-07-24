import { NextResponse } from "next/server";
import { Story } from "../../../../utils/types";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const userId = params.id;
    console.log(userId)
    // use userId to fetch the stories of the user
    const data: Story[] = [{
        id: '1',    
        url: 'images/plants.png',
        header: {
			heading: 'mono_repo',
			subheading: 'Posted 30m ago',
			profileImage: 'images/person.svg',
		},
    },
    {
        id: '2',
        url: 'images/airport.png',
        header: {
			heading: 'mono_repo',
			subheading: 'Posted 30m ago',
			profileImage: 'images/person.svg',
		},
    },
    {
        id: '3',
        url: 'images/plants.png',
        header: {
			heading: 'mono_repo',
			subheading: 'Posted 30m ago',
			profileImage: 'images/person.svg',
		},
    },
    {
        id: '4',
        url: 'images/airport.png',
        header: {
			heading: 'mono_repo',
			subheading: 'Posted 30m ago',
			profileImage: 'images/person.svg',
		},
    }];
    return NextResponse.json({ data })
  }