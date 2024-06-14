import useGetUserPosts from "../../hooks/useGetUserPosts";
import NoPostsFound from "./NoPostsFound";
import ProfilePost from "./ProfilePost";
import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";
import useGetUserSavedPosts from "../../hooks/useGetUserSavedPosts";

export default function ProfilePosts({isPostsActive, isSavedActive}) {
   const {isLoading, posts} = useGetUserPosts();
   //const userSavedPosts = useGetUserSavedPosts();
   //const { savedPosts} = useGetUserSavedPosts(userId);
    const noPostsFound = !isLoading && posts.length === 0;
    
    if (noPostsFound) return <NoPostsFound />
    return (
        <Grid
			templateColumns={{
				sm: "repeat(1, 1fr)",
				md: "repeat(3, 1fr)",
			}}
			gap={1}
			columnGap={1}
		>
            {isLoading && [0,1,2,3,4,5].map((_,idx) =>(
                <VStack key={idx} alignItems={"flex-start"} gap={4}>
                    <Skeleton w={'full'} startColor='#5C8475' endColor='#113A3A'>
                        <Box h={'300px'}>
                            &nbsp;
                        </Box>
                    </Skeleton>
                </VStack>
            ))
            }
            {!isLoading && isPostsActive ?  (
                <>
                	{posts.map((post) => (
						<ProfilePost post={post} key={post.id} />
					))}
                </>
                ) : (
                    // <>
                	// {posts.map((post) => (
					// 	<ProfilePost post={post} key={post.id} />
					// ))}
                    // </>
                    null
                )
            }
      </Grid>
    )
}