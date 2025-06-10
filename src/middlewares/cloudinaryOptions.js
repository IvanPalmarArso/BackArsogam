
const uploadOption = [
    {
        resource_type : 'auto',
        allowed_formats : [
                'jpg', 'jpeg', 'png', 'mp4', 'mov', 'm4v'
            ],
            transformation : [
            {
                if : 'resource_type_image',
                width : 80,
                height : 80,
                quality : 100
            },
            {
                if : 'resource_type_video',
                width : 200,
                height : 200,
                crop : 'limit',
                quality : 100,
                format : 'mp4'
            }
        ],
        bytes : 50000000
    }
]

export default uploadOption