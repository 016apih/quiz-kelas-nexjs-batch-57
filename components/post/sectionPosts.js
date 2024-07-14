import { useContext, useEffect, useRef, useState } from 'react';
import { Grid, List, ScrollSync } from 'react-virtualized';
import { Box } from '@chakra-ui/react';
import 'react-virtualized/styles.css'; 
import AutoSizer from '@/components/autoSizer';

import CardPost from './cardPost';
import EmptyPost from './emptyPost';
import LoadingPost from './loadingPost';
import { UserContext } from '@/context/userContextProvider';

const SectionPosts = ({ data = [], isLoading, onEdit, onDelete, onLike, onReplies }) => {
   const profile = useContext(UserContext);
   const [maxHeight, setMaxHeight] = useState(500);

   useEffect(() => {
      const resize = () => setMaxHeight(window.innerHeight - 200);

      addEventListener('resize', resize)
      return () => removeEventListener('resize', resize)
   }, [])

   const rowRenderer = ({ index, key, style }) => {
      const item = data[index];
      return (
         <CardPost
            key={'card-post-' + key}
            onLike={() => onLike(item)}
            onReplies={() => onReplies(item)}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
            {...item}
         />
      );
   };

   return (
      <Box>
          <AutoSizer>
          {({width, height}) => (
            <>
            {console.log("first", width, height)}
               <List
                  width={width}
                  height={700}
                  rowHeight={20}
                  rowCount={(data || []).length}
                  rowRenderer={rowRenderer}
               />
            </>
               // <div className="Table">
               //    <div className="LeftColumn">
               //       <List scrollTop={scrollTop} {...props} />
               //    </div>
               //    {/* <div className="RightColumn">
               //       <Grid onScroll={onScroll} {...props} />
               //    </div> */}
               // </div>
            )}
            </AutoSizer>
         {data?.length === 0 && !isLoading && <EmptyPost />}
         {isLoading && <LoadingPost />}
      </Box>
   )
}

export default SectionPosts;